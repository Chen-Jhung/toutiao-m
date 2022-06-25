import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/indexSign'
import Layout from '@/views/layout/indexRt.vue'
import Home from '@/views/home/indexHome.vue'
import Qa from '@/views/qa/indexQa.vue'
import Video from '@/views/video/indexVideo.vue'
import My from '@/views/my/indexMy.vue'
import Search from '@/views/search/SearchIndex.vue'
import Details from '@/views/article/detailsIndex.vue'
import UserProfile from '@/views/userprofile/profileIndex.vue'

Vue.use(VueRouter)

// 定义路由组件
const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    { // 配置一级路由
        path: '/',
        name: 'tab-bar',
        component: Layout,
        children: [{ // 二级路由
                path: '',
                name: 'home',
                component: Home
            },
            {
                path: '/qa',
                name: 'qa',
                component: Qa
            },
            {
                path: '/video',
                name: 'video',
                component: Video
            },
            {
                path: '/my',
                name: 'my',
                component: My
            }
        ]
    },
    { // 配置搜索页面一级路由
        path: '/search',
        name: 'search',
        component: Search
    },
    { // 配置搜索结果列表一级路由
        path: '/article/:articleId', // 设置动态路由
        name: 'article',
        component: Details,
        props: true // 将动态组件的参数传给子组件
    },
    {
        path: '/user/profile',
        name: 'profile',
        component: UserProfile
    }
]

const router = new VueRouter({
    routes
})

export default router