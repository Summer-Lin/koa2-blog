/**
 * 本地缓存token
 */

import { token } from "./config"


class Auth {
  constructor() {}

  static getToken() {
    return window.localStorage.getItem(token)
  }

  static setToken(value) {
    window.localStorage.setItem(token, value)
  }

  static removeToken() {
     return window.localStorage.removeItem(token);
  }

  static onExit() {
    window.location.hash = "/login";
  }
}

export default Auth;