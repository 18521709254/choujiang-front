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
