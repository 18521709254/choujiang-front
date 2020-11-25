import request from '@/utils/request'

/**
 * 小区管理分页查询
 * @param postData 分页查询传输数据
 */
export function listBillByPage(postData) {
  return request({
    url: '/bill/listBillByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 查询全部小区
 */
export function listBillAll() {
  return request({
    url: '/bill/listBillAll',
    method: 'post'
  })
}

/**
 * 保存小区
 * @param postData 小区管理数据
 */
export function saveBill(postData) {
  return request({
    url: '/bill/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询小区
 * @param billId 小区ID
 */
export function getBillById(billId) {
  return request({
    url: '/bill/getBillById?billId=' + billId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除小区
 * @param billIds 小区ID集合
 */
export function delBillByIds(billIds) {
  return request({
    url: '/bill/delByIds?billIds=' + billIds,
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
    url: '/bill/uploadImage',
    method: 'post',
    data: postData
  })
}

