// 导入axios 请求模块
import request from '@/utils/request'
// 导入store 模块
// import store from '@/store/index'

// 导出封装请求接口
export const login = data => {
    return request({
        method: 'POST', // 请求方式
        url: '/v1_0/authorizations', // 请求接口
        data // 请求数据
    })
}

// 导出封装好的验证码请求接口
export const sendSms = mobile => {
        return request({
            method: 'GET', // 请求方式
            url: `/v1_0/sms/codes/${mobile}` // 请求接口
        })
    }
    // 获取个人信息的接口
export const geiUserInfo = () => {
    return request({
        method: 'GET', // 请求方式
        url: '/v1_0/user' // 请求接口
            // headers: { // 发送请求头数据 连接口需要授权才能访问
            //     Authorization: `Bearer ${store.state.user.token}`
            // }
    })
}

// 获取列表信息数据的接口
export const getUserChannels = () => {
        return request({
            method: 'GET', // 请求方式
            url: '/v1_0/user/channels' // 请求接口
        })
    }
    // 获取关注用户信息
export const onAddFollow = target => {
        return request({
            method: 'POST', // 请求方式
            url: '/v1_0/user/followings', // 请求接口
            data: {
                target
            }
        })
    }
    // 获取取消关注用户信息
export const onDeleteFollow = target => {
    return request({
        method: 'DELETE', // 请求方式
        url: `/v1_0/user/followings/${target}` // 请求接口
    })
}