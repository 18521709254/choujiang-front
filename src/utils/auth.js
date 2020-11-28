import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserInfo = 'vue_user_info'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfo, userInfo)
}

export function getUserInfo() {
  return Cookies.get(UserInfo)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
