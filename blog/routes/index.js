const router = require('koa-router')
//引入User控制层
const user = require('../controllers/user')


const routers = new router({
  prefix: '/api/v1'
})

/**
 * 用户接口
 */
// 用户注册
routers.post('/user/register', user.create);
// 用户登录
routers.post('/user/login', user.login);


module.exports = routers
