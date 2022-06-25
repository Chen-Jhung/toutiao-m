/*
 * 文章请求模块
 */

// 导入axios 请求模块
import request from '@/utils/request'

// 请求文章列表数据
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        // params 用来配置Query参数
        params // 发送查询参数
    })
}

// 请求新闻文章详情内容
export const getArticlesContainer = articleId => { // articleId是后端api文档指定要传的参数
    return request({
        timeout: 6000, // 6秒钟
        method: 'GET',
        url: `/v1_0/articles/${articleId}`
    })
}

// 收藏文章请求
export const postColleArticle = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

// 取消收藏文章请求
export const deleteColleArticle = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}

// 点赞文章请求
export const postLikeArticle = target => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target
        }
    })
}

// 取消点赞文章请求
export const deleteLikeArticle = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`
    })
}