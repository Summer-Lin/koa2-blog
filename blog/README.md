## 基于node-koa2的博客 2019/05/29

[参考项目 - 写接口]: https://www.imooc.com/article/80671
[参考项目]: https://github.com/liangfengbo/nodejs-koa-blog
#### 一 准备
- 1 根据koa2创建项目
```js
//安装koa-generator，利用koa-generator快速搭建Node.js服务器
1. npm install koa-generator -g  
//用koa2创建文件夹
2. koa2 blog 
// 进入文件夹,并安装依赖
3. cd blog && npm install
//启动项目  
4. npm  start
//浏览器打开下面网址,初始项目建成
//看到“Hello Koa 2!”就是启动成功了！
5. localhost:3000
```
- 2 安装mysql数据库
```js
1. 官网下载安装数据库
  版本号: mysql  Ver 8. 0.16 for Win64 on x86_64 (MySQL Community Server - GPL)
2. 下载安装navicat, mysql的可视化软件  
3. 设置数据库, 账户名 root  密码  123456
```

- 3 安装配置sequelize
```js
// 用于操作数据库
1. npm install sequelize mysql mysql2 --save 
//根目录下新建一个config文件，在config文件下新建一个db.js文件，
//这个文件就是用来建立连接mysql数据库的
2. 数据库名字 : blogs 
3. 命令行进入mysql,创建数据库命令: 
   CREATE DATABASE blogs DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
4. 看db.js文件,配置好对应的数据库用户名和密码
5. 用Navicat软件连接数据库,第一次连接可能失败,会报错.百度有解决方法.

```

- 4 建MVC项目结构
  - schema（数据表模型）
  - models（模型）
  - controllers（控制器）
  
```
分别在这三个文件夹下各新建user.js文件,建立有关用户的MVC

├── schema
    └── user.js
└── models
    └── user.js
└── controllers
    └── user.js
```
#### 二 实现接口调用
- 1 完成注册接口
```js
//实现注册接口
1. 在schema文件夹下 user.js 配置创建用户的数据库格式
2. 在models文件夹下配置 user.js 配置传入username, password, email
   编写 create 方法 和 queryUsername 方法
3. 安装node环境的加密插件和生成token插件
   npm install bcryptjs jsonwebtoken --save 
4  在config文件下建 secret.json 文件,变量名配置
5  在controllers文件夹下 user.js 文件,编写 create 方法,
6  写接口,进入routes文件夹的 index.js 文件,删除原来的内容,
   编写 用户注册 接口
7  进入  bin文件夹的 www文件,更改 端口号, 避免冲突, 3000 端口号改 4000
8  开启项目,npm run dev, 因为有nodemon,所以更改代码会实时编译 
9  打开postman调用接口  http://localhost:4000/api/v1/user/register 
   如下图,则注册接口成功
```
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/2.png)
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/3.png)

- 2 完成登录接口
```js
//实现登录接口
1 在controllers文件夹下 user.js 文件,编写 login 方法
2 在routes文件夹的 index.js 文件添加 用户登录 接口
3 postman调用接口  http://localhost:4000/api/v1/user/login
  如下图,则登录接口成功
```
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/4.png)

- 3 完成用户列表接口
```
// 实现获取用户列表接口
1 在models文件夹下 user.js 编写 findAllUserList 方法 
2 在controllers文件夹下 user.js 文件,编写 list 方法
3 在routes文件夹的 index.js 文件添加 获取用户列表 接口
4 postman调用接口  http://localhost:4000/api/v1/user/list
  如下图,则 获取用户列表 接口成功
```
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/5.png)

- 4 token过滤 和 解决token验证问题
```
// 接口不是随便给别人乱调用的,所以就得增加token验证
// 使用koa-jwt插件
1 建文件夹 middleware, 建JWTToken.js, JWTPath.js文件并编码
2 在app.js引起 JWTToken 文件,并且 use
3 安装koa-jwt   npm install koa-jwt --save  
4 在app.js  引入 secret.json文件,
  引入 koa-jwt,并且进行配置,过滤不需要进行token验证列表.
```
  - token过期
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/6.png)
  - 登录接口实现 免校验token
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/7.png)
  - 不传token 错误
![image](https://github.com/Summer-Lin/koa2-blog/blob/master/blogImg/8.png)










分别在这三个文件夹下各新建article.js文件

├── schema
    └── article.js
└── modules
    └── article.js
└── controllers
    └── article.js
```

schema下的article.js数据库格式
字段 | 说明 | 必填 
---|---|---
id | 自增文章ID |否 
title | 文章标题 |是 
author | 文章作者 |是 
introduction | 文章介绍 |是 
tag | 文章标签 |是 
cover | 文章封面 |是 
content | 文章内容 |是 
browser | 浏览次数 |否 
is_del | 是否隐藏 |是 
createdAt | 创建时间 |否 
updatedAt | 更新时间 |否 


