import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入适配文件
import 'amfe-flexible'
// 注册全局样式文件
import '@/style/index.less'
import '@/utils/dayjs'
// 引入vant全局组件
import { Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Icon, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog, Tab, Tabs, List, PullRefresh, Popup, Search, Loading, Divider, Picker, DatetimePicker } from 'vant'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Search)
Vue.use(Loading)
Vue.use(Divider)
Vue.use(Picker)
Vue.use(DatetimePicker)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')