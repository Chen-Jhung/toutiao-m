// 引入处理相对时间的库
import dayjs from 'dayjs'
import Vue from 'vue'
// 加载中文语言包，默认时英文
import 'dayjs/locale/zh-cn'
// 处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用中文语言包
dayjs.locale('zh-cn') // 全局使用此语言包

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 定义全局事件过滤器，处理相对时间
// 其实过滤器就相当于一个全局可用的方法，但仅供于模板使用
// 参数1 过滤器名称
// 参数2 过滤器函数
// 使用方式 {{ 表达式 | 过滤器名称 }}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value)) // 返回的是发布文章的时间距离现在的时间
})

// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()

// 获取当前最新的时间
// console.log(dayjs().format('YYYY-MM-DD'))