<template>
  <div class="article-list">
      <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500">
   <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
      <ArticlesItem
      v-for="(obj,index) in list"
      :key="index"
      :articles="obj"  />
      <!-- <van-cell v-for="(obj,index) in list" :key="index" :title="obj.    title" /> -->
  </van-list>
      </van-pull-refresh>

  </div>
</template>

<script>
// 导入列表数据请求模块
import { getArticles } from '@/api/article'
// 导入文章列表项目组件
import ArticlesItem from './articles-item/articlesIndex.vue'
export default {
    name: 'ArticleList',
     data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 用于请求下一页的时间戳
      error: false, // 用于请求失败后的提示 当用户重新点击这个错误提示后会重新加载数据
      isLoading: false, // 下拉刷新
      refreshSuccessText: '' // 下拉刷新时提示的文本
    }
  },
    props: {
       channel: {
            type: Object, // 对象格式的数据
            required: true // 必须的数据，否则报错
       }
    },
    methods: {
    async onLoad() {
      // 异步更新数据
      try {
       const { data } = await getArticles({
           channel_id: this.channel.id, // 频道ID
           timestamp: this.timestamp || Date.now()// 时间戳 简单理解就是请求数据的页码
       })

    //    if (Math.random() > 0.1) { // 模拟错误信息
    //        JSON.parse = 'aohsfihjhapjo'
    //    }
        // console.log(data)
        const { results } = data.data // 结构列表数据的数组
        this.list.push(...results) // 利用results数组展开符在list数组后面push添加对应的results数据
        this.loading = false // 到页面到底时重新加载数据
        if (results.length) { // 如果results数组里面还有数据的还 则继续执行if里面的代码
            this.timestamp = data.data.pre_timestamp // 时间戳 请求新的推荐数据传当前时间戳，请求历史推荐传指定的时间戳
        } else {
            this.finished = true // 数据加载后时候将finished改为true
        }
      } catch (err) { // 请求失败的时候
          console.log('请求数据失败' + err)
          this.error = true // 展示错误提示状态
          this.loading = false // 当请求失败的时候 loading也需要关闭
    }
    },
    async onRefresh() {
        try {
            const { data } = await getArticles({
                channel_id: this.channel.id, // 频道id
                timestamp: Date.now() // 获取当前时间戳的数据

            })
             const { results } = data.data // 结构当前数组的数据
             this.list.unshift(...results) // 使用unshift将新的数据追加到list数组的前面
             this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
             this.isLoading = false // 数据追加成功后，1500ms重新将状态改为false
        } catch (err) {
            console.log(err)
            this.isLoading = false // 下拉操作后再提示下面的错误提示文本
            this.refreshSuccessText = `刷新失败,出现${err}问题`
        }
    }

    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  },
  components: {
    ArticlesItem
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 因为鼠标滚动的时候时再body页面经行滚动的，所以会使所有的列表页面跟着一起滚动，这时我们需要在每个列表页面设置它们自己的滚动方式
height: 86vh; // vw，vh是指视口单位
overflow-y: auto; // 设置溢出的话则采用滚动浏览
}
</style>