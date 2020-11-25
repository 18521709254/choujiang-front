import request from '@/utils/request'

/**
 * 会员管理分页查询
 * @param postData 分页查询传输数据
 */
export function listMemberByPage(postData) {
  return request({
    url: '/member/listMemberByPage',
    method: 'post',
    data: postData
  })
}

/**
 * 查询全部会员
 */
export function listMemberAll() {
  return request({
    url: '/member/listMemberAll',
    method: 'post'
  })
}

/**
 * 保存会员
 * @param postData 会员管理数据
 */
export function saveMember(postData) {
  return request({
    url: '/member/save',
    method: 'post',
    data: postData
  })
}

/**
 * 根据ID查询会员
 * @param memberId 会员ID
 */
export function getMemberById(memberId) {
  return request({
    url: '/member/getMemberById?memberId=' + memberId,
    method: 'post'
  })
}

/**
 * 根据ID集合删除会员
 * @param memberIds 会员ID集合
 */
export function delMemberByIds(memberIds) {
  return request({
    url: '/member/delByIds?memberIds=' + memberIds,
    method: 'post'
  })
}

