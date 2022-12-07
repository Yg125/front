import request from '@/utils/request'
export function getCoursesList(params) {
    return request({
        url: 'lab/courses/',
        method: 'get',
        params
    })
}
export function addCourse(data) {
    return request({
        url: 'lab/courses/',
        method: 'post',
        data
    })
}

export function deleteCourse(id) {
    return request({
        url: 'lab/courses/' + id + '/',
        method: 'delete',
    })
}

export function updateCourse(id, data) {
    return request({
        url: 'lab/courses/' + id + '/',
        method: 'put',
        data
    })
}