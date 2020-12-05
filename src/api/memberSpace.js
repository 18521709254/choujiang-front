import request from '@/utils/request'

/**
 * 车位管理分页查询
 * @param postData 分页查询传输数据
 */
export function listMemberSpaceByPage(postData) {
  return request({
    url: '/memberSpace/listMemberSpaceByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 根据小区ID获取车位信息
 * @param communityId 小区ID
 */
export function listMemberSpaceByCommunityId(communityId) {
  return request({
    url: '/memberSpace/listMemberSpaceByCommunityId?communityId=' + communityId,
    method: 'post'
  })
}

/**
 * 保存车位
 * @param postData 车位管理数据
 */
export function saveMemberSpace(postData) {
  return request({
    url: '/memberSpace/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询车位
 * @param spaceId 车位ID
 */
export function getMemberSpaceById(spaceId) {
  return request({
    url: '/memberSpace/getParkingMemberSpaceById?spaceId=' + spaceId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除车位
 * @param spaceIds 车位ID集合
 */
export function delMemberSpaceByIds(spaceIds) {
  return request({
    url: '/memberSpace/delByIds?spaceIds=' + spaceIds,
    method: 'post'
  })
}

