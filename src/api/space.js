import request from '@/utils/request'

/**
 * 车位管理分页查询
 * @param postData 分页查询传输数据
 */
export function listSpaceByPage(postData) {
  return request({
    url: '/space/listSpaceByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 保存车位
 * @param postData 车位管理数据
 */
export function saveSpace(postData) {
  return request({
    url: '/space/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询车位
 * @param spaceId 车位ID
 */
export function getSpaceById(spaceId) {
  return request({
    url: '/space/getParkingSpaceById?spaceId=' + spaceId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除车位
 * @param spaceIds 车位ID集合
 */
export function delSpaceByIds(spaceIds) {
  return request({
    url: '/space/delByIds?spaceIds=' + spaceIds,
    method: 'post'
  })
}

