import request from '@/utils/request'

/**
 * 角色管理分页查询
 * @param postData 分页查询传输数据
 */
export function listRoleByPage(postData) {
  return request({
    url: '/role/listRoleByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 查询全部角色
 */
export function listRoleAll() {
  return request({
    url: '/role/listRoleAll',
    method: 'post'
  })
}

/**
 * 保存角色
 * @param postData 角色管理数据
 */
export function saveRole(postData) {
  return request({
    url: '/role/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询角色
 * @param roleId 角色ID
 */
export function getRoleById(roleId) {
  return request({
    url: '/role/getRoleById?roleId=' + roleId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除角色
 * @param roleIds 角色ID集合
 */
export function delRoleByIds(roleIds) {
  return request({
    url: '/role/delByIds?roleIds=' + roleIds,
    method: 'post'
  })
}

