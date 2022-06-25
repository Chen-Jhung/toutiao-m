<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(searchobj,index) in SearchList"
    :key="index"
    >
    <span
    slot="title"
    v-html="highlight(searchobj)"
    @click="searchResultText(searchobj)"
    ></span>
    </van-cell>
     <van-cell
     title="搜索: 无结果"
     v-if="SearchListlength === 0"
     center
     ></van-cell>
  </div>
</template>

<script>
// 导入联想建议数据请求模块
import { getSearchSuggestion } from '@/api/search'
// 导入防抖节流的包
import { debounce } from 'lodash'
export default {
    name: 'SearchSuggestion',
    data () {
      return {
        SearchList: [], // 存储联想建议数据的数组
        SearchListlength: null // 存储数组的长度后 让cell判断数组长度是否为0 如果为0 则显示搜索无结果
        // htmlStr: 'hello <span style="color: red">world</span> '
      }
    },
    props: {
      SearText: {
        type: String,
        required: true
      }
    },

    // 侦听器
    watch: {
      SearText: { // 侦听对象
         handler: debounce(function(value) {
           this.loadSearchSuggestion(value)
           console.log(value)
         }, 200),
        // handler (value) { // value是传送过来的值
        //   // console.log(value)
        //   this.loadSearchSuggestion(value) // 调用请求联想数据的方法并传参
        // },
        immediate: true // 在侦听开始之后立即被执行
      }
    },
    methods: {
      // 用于请求联想建议的数据
     async loadSearchSuggestion (q) {
       try {
         const { data } = await getSearchSuggestion(q)
         console.log(data)
        this.SearchList = data.data.options
        this.SearchListlength = this.SearchList.length// 用户统计数组的长度
       } catch (err) {
         this.$toast('搜索错误,请稍后重试')
       }
      },
      // 字符串高亮效果，使用正则匹配
      highlight (searchobj) {
        if (searchobj === null) { // 当searchobj为null 执行以下代码 不然得话会报错
          // this.SearchListlength = searchobj
          this.SearchList = null
          this.SearchListlength = 0
          return
        }
       const highlightStr = `<span class="highlightText">${this.SearText}</span>`
       // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
       // 如果需要根据数据变量动态的创建正则表达式，则手动new RegEep
       // RegExp 正则表达式构造函数
       // 参数1 匹配模式字符串，他会根据这个字符串创建正则表达式
       // 参数2 匹配模式，要写到字符串中
       const reg = new RegExp(this.SearText, 'gi')
       return searchobj.replace(reg, highlightStr)
      },
      // 联想建议搜索结果
      searchResultText(searchobj) {
          this.$emit('resuleLetter', searchobj)
      }
    }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .highlightText {
    color:#5babfb
  }
}
</style>