<template>
  <div class="search-result">
    <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad"
     :error.sync="error"
     error-text="加载失败，请点击重试"
    >
  <van-cell v-for="(resultsobj,index) in list" :key="index" :title="resultsobj.title" />
</van-list>
  </div>
</template>

<script>
  import { getSearchResult } from '@/api/search'
export default {
    name: 'SearchResult',
     data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      perpage: 20,
      error: false
    }
  },
  props: {
    searchResult: {
      type: String,
      required: true
    }
  },
    methods: {
     async onLoad() {
       try {
       // 1 请求获取数据
       const { data } = await getSearchResult({
       page: this.page,
       per_page: this.perpage,
       q: this.searchResult
       })
       // 2 将数组数据添加到列表中
       console.log(data)
       const { results } = data.data
       this.list.push(...results)

       // 3 将本次加载中得loading 关闭掉
       this.loading = false

       // 4 判断是否还有数据
       if (results.length) {
       //  有得话 则更新下一页页码
         this.page++
       } else {
       //  没有得话，则将加载中得 finished 给关闭掉 （true）
         this.finished = true
       }
       } catch (err) {
        //  this.$toast('数据获取失败，请稍后重新')
        this.error = true // 加载失败时提示文本
        this.loading = false
       }
      }
  }
}
</script>

<style>

</style>