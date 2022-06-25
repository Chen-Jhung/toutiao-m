/*
 * 联想建议搜索数据请求模块
 */

// 导入axios 请求模块
import request from '@/utils/request'

// 请求文章列表数据
export const getSearchSuggestion = q => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}

// 请求搜索结果列表数据
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}