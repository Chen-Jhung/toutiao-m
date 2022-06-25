import Vue from 'vue'
import Vuex from 'vuex'
// 导入封装好的本地存储操作模块
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
    state: {
        user: getItem(TOKEN_KEY) // 使用JSON.parse将已经转化为字符串的token数据重新转化解析成对象格式 getItem获取的意思
            // user: null // 一个对象 存储当前登录用户信息 （token等数据）
    },
    getters: {},
    mutations: {
        // 定义一个函数
        setUser(state, data) {
            state.user = data
                // 为了放置刷新丢失，我们需要把state.user数据进行本地存储 在对数据进行JSON格式的字符串转化 括号的第一个参数是token数据的名称
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})