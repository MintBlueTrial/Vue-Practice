/*
* @Time    : 2020/10/10 17:16
* @Author  : DannyDong
* @File    : book.js
* @Description: 电子书相关Api
*/

import request from '../utils/request'

// 创建图书Api
export function createBook(book) {
    return request({
        url: '/book/create',
        method: 'post',
        data: book
    })
}

// 获取图书Api
export function getBook(fileName) {
    return request({
        url: '/book/get',
        method: 'get',
        params: {fileName}
    })
}

// 更新图书Api
export function updateBook(book) {
    return request({
        url: '/book/update',
        method: 'post',
        data: book
    })
}

// 获取图书分类Api
export function getCategory() {
    return request({
        url: '/book/category',
        method: 'get'
    })
}

// 获取图书列表
export function listBook(params) {
    return request({
        url: '/book/list',
        method: 'get',
        params
    })
}
