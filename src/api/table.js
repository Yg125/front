import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'rbac/users/',
    method: 'get',
    params
  })
}
