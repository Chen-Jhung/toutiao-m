<template>
  <div class="search-history">
    <van-cell title="搜索历史" class="history-box">
      <div v-if="isDeleteShow" class="DeleteIcon">
      <span @click="rearchAllDelete">全部删除</span>
      &nbsp;
      <span @click="isDeleteShow = false">完成</span>
      </div>
      <span v-else class="deleteBtn" @click="isDeleteShow = true">
        <span>编辑</span>
        <van-icon name="delete" />
      </span>
     <!-- <van-button type="default" plain round="" size="mini" class="delete-btn" @click="isDeleteShow">编辑
       <van-icon name="delete-o" size="40" />
     </van-button> -->
      <!-- <van-icon v-else name="delete" @click="isDeleteShow = true"/> -->
    </van-cell>
    <van-cell
    :title="searchTitletext"
    v-for="(searchTitletext,index) in SearchTitle"
    :key="index"
    @click="onSearchItemClick(searchTitletext,index)"
    >
    <van-icon name="close" v-if="isDeleteShow"/>
    </van-cell>
  </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    data () {
      return {
      isDeleteShow: false
      // searchHitories: []
      }
    },
    props: {
      SearchTitle: {
        type: Array,
        required: true
      }
    },
    methods: {
      onSearchItemClick (item, index) {
        if (this.isDeleteShow) {
          // 编辑删除状态 点击则删除历史记录数据
          this.$emit('SearchTitleText', index)
        } else {
          // 非编辑状态， 直接点击进入搜索结果
          this.$emit('SearchTitleResultsText', item)
        }
      },
      rearchAllDelete() {
        // 全部删除
        this.$emit('rearchAllTitleText', [])
      }
    }
}
</script>

<style scoped lang="less">
.search-history {
  .history-box {
    height: 100px;
    line-height: 100px;
    padding: 0 32px;
  }
  .DeleteIcon {
    color: #111;
  }
  .deleteBtn {
    font-size: 20px;
    color: #111;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 7px;
   /deep/ .van-icon-delete {
      font-size: 30px;
      vertical-align:text-top; // 文字与文字水平对齐
}
  }
}

</style>