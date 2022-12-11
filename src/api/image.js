import request from '@/utils/request'

export function getImageList(params) {
    return request({
      url: 'lab/images/',
      method: 'get',
      params
    })
}

export function addImage(data) {
    return request({
      url: 'lab/images/',
      method: 'post',
      data
    })
}

export function updateImage(id,data) {
    return request({
      url: 'lab/images/' + id + '/',
      method: 'put',
      data
    })
}

export function deleteImage(id) {
    return request({
      url: 'lab/images/' + id + '/',
      method: 'delete'
    })
}

export function BuildImage(name) {
  return request({
    url: 'oper/build/?name=' + name,
    method: 'get',
    name
  })
}