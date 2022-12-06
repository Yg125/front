import request from '@/utils/request'

export function getUsersList(params) {
  return request({
    url: 'rbac/users/',
    method: 'get',
    params
  })
}

export function getCoursesList(params) {
  return request({
    url: 'lab/courses/',
    method: 'get',
    params
  })
}
export function getImagesList(params) {
  return request({
    url: 'lab/images/',
    method: 'get',
    params
  })
}
export function getContainersList(params) {
  return request({
    url: 'lab/containers/',
    method: 'get',
    params
  })
}