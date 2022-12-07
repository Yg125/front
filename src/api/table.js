import request from '@/utils/request'




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