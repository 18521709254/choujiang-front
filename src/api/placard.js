import request from '@/utils/request'

/**
 * 公告管理分页查询
 * @param postData 分页查询传输数据
 */
export function listPlacardByPage(postData) {
  return request({
    url: '/placard/listPlacardByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 查询全部公告
 */
export function listPlacardAll() {
  return request({
    url: '/placard/listPlacardAll',
    method: 'post'
  })
}

/**
 * 保存公告
 * @param postData 公告管理数据
 */
export function savePlacard(postData) {
  return request({
    url: '/placard/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询公告
 * @param placardId 公告ID
 */
export function getPlacardById(placardId) {
  return request({
    url: '/placard/getPlacardById?placardId=' + placardId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除公告
 * @param placardIds 公告ID集合
 */
export function delPlacardByIds(placardIds) {
  return request({
    url: '/placard/delByIds?placardIds=' + placardIds,
    method: 'post'
  })
}

