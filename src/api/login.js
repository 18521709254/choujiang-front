import request from '@/utils/request'

/**
 * 登陆
 */
export const login = param => request({
  url: '/user/login',
  method: 'post',
  data: param
})
/**
 * 登出
 */
export const logout = () => {
  return request({
    url: '/logout',
    method: 'get'
  })
}
