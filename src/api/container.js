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

export function getTotalContainers(params) {
  return request({
    url: 'lab/total/containers/',
    method: 'get',
    params
  })
}

export function CreateContainer(params) {
  return request({
    url: 'oper/createcontainer/?course_id=' + params,
    method: 'get',
  })
}

export function StopContainer(params) {
  return request({
    url: 'oper/stopcontainer/?container_id=' + params,
    method: 'get',
  })
}

export function StartContainer(params) {
  return request({
    url: 'oper/startcontainer/?container_id=' + params,
    method: 'get',
  })
}

export function RemoveContainer(container_id) {
  return request({
    url: 'lab/containers/' + container_id + '/',
    method: 'delete',
  })
}

export function CommitContainer(data) {
  return request({
    url: 'oper/commit/',
    method: 'post',
    data,
  })
}