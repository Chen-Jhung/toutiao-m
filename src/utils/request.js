// 封装axios请求模块

import axios from 'axios'
// 导入store模块
import store from '@/store/index'

// jsonBigint.parse() 是把JSON 格式的字符串轉爲JavaScript 對象
// jsonBigint.stringify() 把JavaScript 對象轉爲 JSON 格式的字符串
import jsonBigint from 'json-bigint'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    // 自定义后端返回的原始数据
    // data 是后端返回的原始数据，说白了就是 JSON格式的字符串
    transformResponse: [function(data) {
        // Do whatever you want to transform the data
        try {
            return jsonBigint.parse(data)
        } catch (err) {
            // 如果后端返回的数据不是一个JSON格式的字符串则原封不动的返回原数据
            return data
        }
    }]
})

// 请求拦截器
request.interceptors.request.use(function(config) {
    // 请求发起会经过这里
    // config 是本次请求的请求配置对象
    // Do something before request is sent
    const { user } = store.state
    console.log(user)
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(config)
        // 注意，这里必须要返回 config 配置对象， 否则就停在这里出不去了
    return config
}, function(error) {
    // 当请求出现错误的时候(还没有发出去) 则会进入这里
    // Do something with request error
    return Promise.reject(error)
})

// 相应拦截器
export default request