import axios from 'axios'
import Auth from "./auth"
import { token } from "@/utils/config"
import {
  expireToken,
  bus
} from "@/utils/config"
// 创建实例时配置默认值
const ajax = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',
  timeout: 10000
})

// 添加请求拦截器
ajax.interceptors.request.use(config => {

  const jwt = Auth.getToken();
  //将token放到header,由于node采用 koa-jwt验证,
  //所以前面得加 Bearer 这个字符串(记住字母后面要空格)
  //平常对接java后台这些是不需要加 Bearer 的
  jwt && (config.headers["Authorization"] = `Bearer ${jwt}`);

  return config
  
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
ajax.interceptors.response.use(response => {
  console.log(response)

  if (expireToken.indexOf(response.data.code) > -1) {
    bus.$Message.error(response.data.data.message);
     setTimeout(() => {
        Auth.onExit();
     }, 1000);
     return Promise.reject({ source: "JWT",  message: "登录过期,请重新登录!"})
  }
  return response.data
}, error => {
  return Promise.reject(error)
})

export default ajax