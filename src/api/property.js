import request from '@/utils/request'

/**
 * 物业管理分页查询
 * @param postData 分页查询传输数据
 */
export function listPropertyByPage(postData) {
  return request({
    url: '/property/listPropertyByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 保存物业
 * @param postData 物业管理数据
 */
export function saveProperty(postData) {
  return request({
    url: '/property/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询物业
 * @param propertyId 物业ID
 */
export function getPropertyById(propertyId) {
  return request({
    url: '/property/getPropertyById?propertyId=' + propertyId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除物业
 * @param propertyIds 物业ID集合
 */
export function delPropertyByIds(propertyIds) {
  return request({
    url: '/property/delByIds?propertyIds=' + propertyIds,
    method: 'post'
  })
}

