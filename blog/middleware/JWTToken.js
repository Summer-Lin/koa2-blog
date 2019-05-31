const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')
const util = require('util')
//拥有promise用法
const verify = util.promisify(jwt.verify)
const JWTPath = require('./JWTPath')

/**
 * 判断token是否可用
 */

 module.exports = function () {
   return async function (ctx, next) {
     
      //检测过滤的路由,不用解析JWT
      if (JWTPath.find(item => item === ctx.request.url)) {
        await next()

        return false;
      }

      try {
        const token = ctx.header.authorization
         
        if (token) {
          let payload

          try {
            //解密playload,获取用户信息
            //token.split(' ')[1],这种写法,koa-jwt插件要前端调用接口,
            //必须使用 Bearer "token"拼写,所以为了获取token,就得用以下写法
            payload = await verify(token.split(' ')[1], secret.sign)
            ctx.user = {
                name: payload.name,
                email: payload.email,
                id: payload.id
            }
          } catch (err) {
              ctx.status = 401;
              ctx.body = {
                code: 401,
                message: "Token身份无效!"
              }
          }
        }
        //千万不要忘了这一步,不然执行不下去
        await next()

      } catch (err) {
          if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
              code: 401,
              err
            }
          } else {
            ctx.status = 500;
            ctx.body = {
              code: 500,
              err
            }
          }
      }
   }
 }