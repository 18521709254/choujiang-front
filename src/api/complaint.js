import request from '@/utils/request'

/**
 * 投诉管理分页查询
 * @param postData 分页查询传输数据
 */
export function listComplaintByPage(postData) {
  return request({
    url: '/complaint/listComplaintByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 查询全部投诉
 */
export function listComplaintAll() {
  return request({
    url: '/complaint/listComplaintAll',
    method: 'post'
  })
}

/**
 * 根据物业查询投诉
 * @param propertyId 物业ID
 */
export function listComplaintByPropertyId(propertyId) {
  return request({
    url: '/complaint/listComplaintByPropertyId?propertyId=' + propertyId,
    method: 'post'
  })
}

/**
 * 保存投诉
 * @param postData 投诉管理数据
 */
export function saveComplaint(postData) {
  return request({
    url: '/complaint/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询投诉
 * @param complaintId 投诉ID
 */
export function getComplaintById(complaintId) {
  return request({
    url: '/complaint/getComplaintById?complaintId=' + complaintId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除投诉
 * @param complaintIds 投诉ID集合
 */
export function delComplaintByIds(complaintIds) {
  return request({
    url: '/complaint/delByIds?complaintIds=' + complaintIds,
    method: 'post'
  })
}

/**
 * 根据ID集合删除投诉
 * @param file 图片文件
 */
export function uploadImage(file) {
  const postData = new FormData()
  postData.append('uploadFile', file)
  return request({
    url: '/complaint/uploadImage',
    method: 'post',
    data: postData
  })
}

