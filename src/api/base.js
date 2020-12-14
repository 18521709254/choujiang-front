import request from '@/utils/request'

/**
 * 上传图片
 * @param file 图片文件
 */
export function uploadImage(file) {
  const postData = new FormData()
  postData.append('uploadFile', file)
  return request({
    url: '/base/uploadImage',
    method: 'post',
    data: postData
  })
}

