const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const JWTToken = require('./middleware/JWTToken')
const secret = require("./config/secret.json")
const jwt = require('koa-jwt')
const cors = require('koa-cors');

// error handler
onerror(app)

app.use(JWTToken())
// 解决跨域问题
app.use(cors());

// token 错误抛出,必须写在 jwt上面
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        data: err
      };
    } else {
      throw err;
    }
  });
});

// 此接口列表，unless表示过滤不用jwt验证
app.use(jwt({
  secret: secret.sign
}).unless({
  path: [
    //登录
    /^\/api\/v1\/user\/login/,
    //注册
    /^\/api\/v1\/user\/register/,
   
  ]
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
