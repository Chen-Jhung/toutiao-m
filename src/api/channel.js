/*
 ** 获取全部频道的api
 */

import request from '@/utils/request'

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

// 储存数据到线上
/*
 * 储存添加用户频道
 */
export const addUserChannel = channel => {
        return request({
            method: 'PATCH',
            url: '/v1_0/user/channels',
            data: {
                channels: [channel]
            }
        })
    }
    /*
     * 删除用户指定频道
     */
export const deleteUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`
    })
}