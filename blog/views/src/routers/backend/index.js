import Vue from "vue"
import VueRouter from "vue-router"
import layout from "@/pages/backend/components/layout.vue"

Vue.use(VueRouter)

//这种 懒加载 方式引入,需要 安装 babel-plugin-syntax-dynamic-import 插件,
//并在 .babelrc 配置 syntax-dynamic-import
const _import = file => () =>
  import("@/pages/backend/" + file + ".vue");

const routes = [
  //登录页面
  {
    path: '/login',
    name: "login",
    component: _import("login/index")
  },
  {
    path: '/user',
    name: "user-container",
    component: layout,
    redirect: {
      name: "userListk"
    },
    children: [
      //用户列表
      {
        path: '/',
        name: "userList",
        component: _import("user/index"),
      }
    ]
  }
]


export default new VueRouter({
routes
})