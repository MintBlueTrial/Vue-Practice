/*
* @Time    : 2020/10/10 17:16
* @Author  : DannyDong
* @File    : book.js
* @Description: 电子书相关Api
*/

import request from '../utils/request'

export function createBook(book) {
    return request({
        url: '/book/create',
        method: 'post',
        data: book
    })
}

export function getBook(fileName) {
    return request({
        url: '/book/get',
        method: 'get',
        params: {fileName}
    })
}

export function updateBook(book) {
    return request({
        url: '/book/update',
        method: 'post',
        data: book
    })
}
