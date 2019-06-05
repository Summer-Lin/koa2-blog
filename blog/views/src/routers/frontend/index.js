import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const _import = file => () =>
  import("@/pages/frontend/" + file + ".vue");

const routes = [{
  path: '/',
  component: _import("index")
}]


export default new VueRouter({
  routes
})