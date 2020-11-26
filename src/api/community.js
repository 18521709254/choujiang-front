import request from '@/utils/request'

/**
 * 小区管理分页查询
 * @param postData 分页查询传输数据
 */
export function listCommunityByPage(postData) {
  return request({
    url: '/community/listCommunityByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 查询全部小区
 */
export function listCommunityAll() {
  return request({
    url: '/community/listCommunityAll',
    method: 'post'
  })
}

/**
 * 根据物业查询小区
 * @param propertyId 物业ID
 */
export function listCommunityByPropertyId(propertyId) {
  return request({
    url: '/community/listCommunityByPropertyId?propertyId=' + propertyId,
    method: 'post'
  })
}

/**
 * 保存小区
 * @param postData 小区管理数据
 */
export function saveCommunity(postData) {
  return request({
    url: '/community/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询小区
 * @param communityId 小区ID
 */
export function getCommunityById(communityId) {
  return request({
    url: '/community/getCommunityById?communityId=' + communityId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除小区
 * @param communityIds 小区ID集合
 */
export function delCommunityByIds(communityIds) {
  return request({
    url: '/community/delByIds?communityIds=' + communityIds,
    method: 'post'
  })
}

/**
 * 根据ID集合删除小区
 * @param file 图片文件
 */
export function uploadImage(file) {
  const postData = new FormData()
  postData.append('uploadFile', file)
  return request({
    url: '/community/uploadImage',
    method: 'post',
    data: postData
  })
}

