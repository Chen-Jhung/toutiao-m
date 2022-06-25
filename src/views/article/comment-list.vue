<template>
  <div class="comment-list">
   <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error="error"
  error-text="加载失败，请点击重试"
  :immediate-check="false"
  >
  <!-- <van-cell
  v-for="(item,index) in list"
  :key="index"
  :title="item.content"
  /> -->
  <CommentItem
  v-for="(item,index) in Clist"
  :key="index"
  :title="item.content"
  :CommentItemList="item"
  @commentNum="item.like_count = $event"
  @commentliking="item.is_liking = $event"
  @commentReply="$emit('commentItemReply',$event)"
  />
 </van-list>
  </div>
</template>

<script>
import { getArticleComment } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
     name: 'comment-list',
      data() {
    return {
      Clist: [],
      loading: false, // 加载状态 默认关闭 false
      finished: false, // 完全加载完毕 ， 默认是关闭 false
      offset: null, // 简单理解问 页码 如果为空 ，则默认从第一页开始加载
      limit: 20, // 一次性请求的数据个数
      error: false // 加载失败时需要提示的文本
    }
  },
  props: {
    articleId: {
      type: [Object, String, Number],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a' // 默认值
    }
  },
  created () {
    this.loading = true
    // 让可视区已加载就显示评论数量
    this.onLoad()
  },
  methods: {
   async onLoad() {
     try {
     // 请求获取数据
      const { data } = await getArticleComment({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId.toString(), // 源id，文章id或评论id   // this.articleId
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      console.log(data)
      this.Clist = this.list
      const { results } = data.data // 获取评论数据
      // eslint-disable-next-line vue/no-mutating-props
      this.Clist.push(...results) // 把评论数据添加到评论列表后面
      // this.$emit('arrList', ...results)
      console.log(this.list)
      // 请求成功后将加载状态关闭
      this.loading = false
      // 将data数据传给父组件 让其显示评论数据
      this.$emit('commentNum', data.data)
      // 判断是否还有数据可加载
      if (results.length) { // 有数据
        this.offset = data.data.last_id
      } else { // 没有数据
        this.finished = true
      }
     } catch (err) {
      console.log(err)
      this.error = true // 加载失败时打开需要提示的文本
      this.loading = false
     }
    }

  },
  components: {
    CommentItem
  }
}
</script>

<style>

</style>