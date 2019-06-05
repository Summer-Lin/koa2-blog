import Vue from 'vue'

//Token常量
export const token = "ATUH_TOKEN"

//过期token
export const expireToken = [401]


// 后台接口域名,分本地开发 和生成环境
export const backendUrl = process.env.NODE_ENV === "development" ? "http://localhost:4000/api/v1" : "http://localhost:4000/api/v1";
//前端接口域名,分本地开发 和生成环境
export const frontendUrl = process.env.NODE_ENV === "development" ? "http://localhost:4000/api/v2" : "http://localhost:4000/api/v2";

export const bus = new Vue()


