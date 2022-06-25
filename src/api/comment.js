/*
 ** 文章评论区域数据获取接口
 */

import request from '@/utils/request'

export const getArticleComment = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

// 评论点赞请求
export const addCommentLike = target => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}

// 取消评论点赞请求
export const deleteCommentLike = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`
    })
}

// 评论点赞请求
export const addCommentPost = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}