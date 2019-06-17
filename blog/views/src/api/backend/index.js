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

/************** 用户 ***************/

// 获取用户列表
export function getUserList() {
  return ajax({
    baseURL: backendUrl,
    method: "get",
    url: "/user/list",
  })
}

/************** 分类 ***************/


// 获取分类列表
export function getCategoryList(data = {}) {
  return ajax({
    baseURL: backendUrl,
    method: "get",
    url: "/category/list",
  })
}
//添加分类
export function categoryCreate(data = {}) {
  return ajax({
    baseURL: backendUrl,
    method: "post",
    url: "/category/create",
    data
  })
}
//添加分类
export function categoryDelete(id) {
  return ajax({
    baseURL: backendUrl,
    method: "delete",
    url: `/category/delete/${id}`,
    
  })
}
//更新分类
export function categoryUpdate(data = {}) {
  console.log(data)
  return ajax({
    baseURL: backendUrl,
    method: "put",
    url: `/category/update/${data.id}`,
    data
  })
}
//分类详情
export function categoryDetail(id) {
  return ajax({
    baseURL: backendUrl,
    method: "get",
    url: `/category/detail/${id}`,

  })
}


// 上传图片
export function upload(data = {}) {
  return ajax({
    baseURL: backendUrl,
    method: "post",
    url: "/upload",
    data
  })
}

