<template>
<!-- 搜索页面 -->
  <div class="search-container">
      <!-- 搜索框 -->
      <form action="/" class="searchFroomBox">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          background="#5babfb"
          @focus="isResultShow = false"
        />
      </form>
      <!-- 搜索框 -->

      <!-- 数据呈现 -->
      <!-- 搜索结果 -->
      <SearchResult
      v-if="isResultShow"
      :searchResult="searchText"
      />
      <!-- 搜索结果 -->

      <!-- 联想建议 -->
      <SearchSuggestion
      v-else-if="searchText"
      :SearText="searchText"
      @resuleLetter="onSearch"
      />
      <!-- 联想建议 -->

      <!-- 搜索历史 -->
      <SearchHistory
      v-else
      :SearchTitle="searchHistoryies"
      @SearchTitleText="searchTitleDelete"
      @rearchAllTitleText="rearchAllTitleDelete"
      @SearchTitleResultsText="onSearch"
      />
      <!-- 搜索历史 -->

      <!-- 数据呈现 -->
  </div>
</template>

<script>
// 导入组件
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
    name: 'SearchIndex',
    data() {
    return {
      searchText: '', // 搜索文本
      isResultShow: false, // 搜索结果的开关
      searchHistoryies: getItem('TOUTIAO_SEARCH_HISTORY') || [] // 把本地存储的数据重新赋值给 searchHistoryies
          }
  },
  methods: {
    onSearch (val) {
     this.isResultShow = true // 渲染搜索结果
     this.searchText = val // 更新文本框内容

    // 1 数组遍历的方法把每一个字符串遍历后 存储到一个常量中
     const HistoryIndex = this.searchHistoryies.indexOf(val)
     // 2 判断遍历的数组中的字符串是否有相同的值，如果有则为1 没有则为-1
     if (HistoryIndex !== -1) { // 如果数组中的每个值的数量不为-1的话，则说明数组中有相同的值，那么则执行if里面的代码
       this.searchHistoryies.splice(HistoryIndex, 1)
     }
     // 3 没有相同的值 则把最新的值添加到数组的前面 unshift
     this.searchHistoryies.unshift(val)
    },
    onCancel () {
      this.$router.back() // 返回上一级
    },

    // 点击删除历史记录
    searchTitleDelete (index) {
      this.searchHistoryies.splice(index, 1)
    },

    // 删除全部历史记录
    rearchAllTitleDelete (val) {
      this.searchHistoryies = val
    }
  },
  components: {
      SearchHistory,
      SearchSuggestion,
      SearchResult
  },
  // 使用侦听器 侦听searchHistoryies数组里的数据是否有发生改变，如果有的话则每一次改变的数据都同步到本地存储中
  watch: {
    searchHistoryies (value) {
      // 把数据存储到本地中
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  }
}
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 108px;
  .searchFroomBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 111;
  }
  .van-search__action{
        color:#fff
    }
}

</style>