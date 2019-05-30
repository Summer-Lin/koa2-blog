const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');
const util = require('util')
const verify = util.promisify(jwt.verify)

class User {
     /**
      * 创建用户
      * @param ctx username     用户名字
      * @param ctx password     用户密码
      * @param ctx email        用户邮箱
      *
      * @returns 创建成功返回用户信息，失败返回错误信息
      */
    static async create(ctx) {
      let {username, password, email} = ctx.request.body

      let params = {
        username,
        password,
        email
      }

      let errors = [];
      for (let i in params) {
        if (params[i] === undefined) {
          let index = errors.length + 1;
          errors.push("错误" + index + ": 参数: " + item + "不能为空")
        }
      }

      if (errors.length > 0) {
        ctx.response.status = 200
        ctx.body = {
          code: 412,
          message: errors
        }
        return false;
      }
      
      //判断用户是否存在
      const exitUser = await UserModel.queryUsername(params.username)

      if (exitUser) {
        ctx.response.status = 200
        ctx.body = {
          code: 403,
          message: "用户已经存在"
        }
      } else {

        try {
          // 将加密的密码存到数据库
          const salt = bcrypt.genSaltSync()
          const hash = bcrypt.hashSync(params.password, salt);
          params.password = hash;

          //创建用户
          await UserModel.create(params);
          const newUser = await UserModel.queryUsername(params.username)

          const userToken = {
            username: newUser.username,
            email: newUser.email,
            id: newUser.id
          }

          //token过期时间为一个小时
          const token = jwt.sign(userToken, secret.sign, {
            expiresIn: '1h'
          })

          ctx.response.status = 200;
          ctx.body = {
             code: 200,
             message: `创建用户成功`,
             data: token
          }
        } catch (err) {
          ctx.response.status = 500;
          ctx.body = {
            code: 500,
            message: err
          }
        }
      }
    }
}

module.exports = User