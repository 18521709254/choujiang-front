import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info?token=' + token,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 用户管理分页查询
 * @param postData 分页查询传输数据
 */
export function listUserByPage(postData) {
  return request({
    url: '/user/listUserByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 保存用户
 * @param postData 用户管理数据
 */
export function saveUser(postData) {
  return request({
    url: '/user/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询用户
 * @param userId 用户ID
 */
export function getUserById(userId) {
  return request({
    url: '/user/getUserById?userId=' + userId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除用户
 * @param userIds 用户ID集合
 */
export function delUserByIds(userIds) {
  return request({
    url: '/user/delByIds?userIds=' + userIds,
    method: 'post'
  })
}
