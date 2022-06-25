// 请求个人用户信息

import request from '@/utils/request'

export const getUserUpdate = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}

// 编辑个人信息资料

export const editUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}

// 编辑个人头像信息
export const getUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}