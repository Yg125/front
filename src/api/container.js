import request from '@/utils/request'

export function getContainersList(params) {
  return request({
    url: 'lab/containers/',
    method: 'get',
    params
  })
}

export function getMyContainersList(params) {
  return request({
    url: 'lab/show/containers/',
    method: 'get',
    params
  })
}

export function getMyTotalContainers(params) {
  return request({
    url: 'lab/total/containers/',
    method: 'get',
    params
  })
}
export function CreateContainer(params) {
  return request({
    url: 'oper/container/?course_id=' + params,
    method: 'get',
  })
}