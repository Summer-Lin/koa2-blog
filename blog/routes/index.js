const router = require('koa-router')
//引入User控制层
const user = require('../controllers/user')
//引入category控制层
const category = require('../controllers/category')

const uploadFile = require('../controllers/upload')
const secret = require("../config/secret.json")


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
//获取用户列表
routers.get('/user/list', user.list);

/**
 * 分类接口
 */

// 添加分类
routers.post('/category/create', category.create);
// 获取分类列表
routers.get('/category/list', category.list);
// 删除分类
routers.delete('/category/delete/:id', category.delete);
// 获取分类详情
routers.get("/category/detail/:id", category.detail);
// 更改分类
routers.put('/category/update/:id', category.update);

//上传图片
routers.post('/upload', async (ctx, next) => {
  //格式这样写,为了捕获错误
   try {
      await uploadFile(ctx, next)

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "图片上传成功",
        imgUrl: `${secret.domain}/images/${ctx.req.file.filename}`
      }

   } catch (err) {
      ctx.response.status = 200;
      ctx.body = {
        code: 500,
        message: err
      }
   }
   
  
});


module.exports = routers
