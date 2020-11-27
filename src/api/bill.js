import request from '@/utils/request'

/**
 * 订单管理分页查询
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
 * 查询全部订单
 */
export function listBillAll() {
  return request({
    url: '/bill/listBillAll',
    method: 'post'
  })
}

/**
 * 保存订单
 * @param postData 订单管理数据
 */
export function saveBill(postData) {
  return request({
    url: '/bill/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询订单
 * @param billId 订单ID
 */
export function getBillById(billId) {
  return request({
    url: '/bill/getBillById?billId=' + billId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除订单
 * @param billIds 订单ID集合
 */
export function delBillByIds(billIds) {
  return request({
    url: '/bill/delByIds?billIds=' + billIds,
    method: 'post'
  })
}

/**
 * 根据ID结束订单
 * @param billIds 订单ID集合
 */
export function closeBillByIds(billIds) {
  return request({
    url: '/bill/closeBillByIds?billIds=' + billIds,
    method: 'post'
  })
}
/**
 * 根据ID结束订单
 * @param billIds 订单ID集合
 */
export function payBillByIds(billIds) {
  return request({
    url: '/bill/payBillByIds?billIds=' + billIds,
    method: 'post'
  })
}

/**
 * 根据ID集合删除订单
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

