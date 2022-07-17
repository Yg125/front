import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/info/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getBooksList(params) {
  return request({
    url: '/books/',
    method: 'get',
    params
  })
}

export function deleteBook(book_id) {
  return request({
    url: '/books/' + book_id + '/',
    method: 'delete',
  })
}

export function updateBook(book_id, data) {
  return request({
    url: '/books/' + book_id + '/',
    method: 'patch',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/user_create/',
    method: 'post',
    data
  })
}

export function activateUser(code) {
  return request({
    url: '/user_activate/' + code + '/',
    method: 'get',
  })
}