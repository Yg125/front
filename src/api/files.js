import request from '@/utils/request'

export function getFileList() {
    return request({
      url: 'oper/files/',
      method: 'get'
    })
}
