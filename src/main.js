import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 注册全局样式文件
import '@/style/index.less'
// 引入vant全局组件
import { Button } from 'vant'
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')