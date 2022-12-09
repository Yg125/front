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

export function selectedCourse(params) {
    return request({
        url: 'oper/selectedcourses/',
        method: 'get',
        params
    })
}

export function selectCourse(params) {
    return request({
        url: 'oper/selectcourses/',
        method: 'get',
        params
    })
}

export function select(params) {
    return request({
        url: 'oper/select/?course_name=' + params,
        method: 'get',
    })
}

export function TeacourseList(params) {
    return request({
        url: 'oper/courses/',
        method: 'get',
        params
    })
}
