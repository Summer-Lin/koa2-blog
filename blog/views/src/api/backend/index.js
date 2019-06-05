import ajax from "@/utils/ajax"
import {
  backendUrl
} from "@/utils/config"

// 登录接口
export function login(data = {}) {
  return ajax({
    baseURL: backendUrl,
    method: "post",
    url: "/user/login",
    data
  })
}

// 获取用户列表
export function getUserList() {
  return ajax({
    baseURL: backendUrl,
    method: "get",
    url: "/user/list",
  })
}