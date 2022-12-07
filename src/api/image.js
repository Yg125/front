import request from '@/utils/request'

export function getImagesList() {
    return request({
      url: 'lab/images/',
      method: 'get'
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