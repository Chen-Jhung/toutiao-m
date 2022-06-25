<template>
  <div class="home-container">
  <!-- 导航栏模块 -->
    <van-nav-bar class="page-nav-login" fixed="">
      <van-button
      class="home-search-btn"
      slot="title"
      type="info"
      icon="search"
      size="small"
      round=""
      to="/search"
      >搜索</van-button>
   </van-nav-bar>
    <!-- 导航栏模块 -->

    <!-- 频道列表模块 -->
   <van-tabs v-model="active" animated swipeable class="channel-tabs" >
    <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
      <!-- 列表页面组件 -->
      <ArticleList :channel="obj"/>
    </van-tab>
    <!-- 插槽占位，避免列表文字被汉堡菜单栏遮挡住 -->
    <div slot="nav-right" class="cover-box"></div>
    <div slot="nav-right" class="menu-btn" @click="isPopupBoxShow = true">
      <i slot="icon" class="iconfont icon-gengduo"></i>
    </div>
   </van-tabs>
    <!-- 频道列表模块 -->
    <van-popup
    v-model="isPopupBoxShow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '88%' }"
    round
    >
     <!-- channelval 是指接收channelEdit子组件传过来的数据 -->
    <ChannelEdit
    :myChannels="channels"
    :myActive="active"
    @channelval="onAllChannel"
    @onChannelsJump="onAlllJump"
    @deleteChannel='ondeleteChannel'
    />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './component/article-list.vue'
// 导入频道组件
import ChannelEdit from '@/views/home/component/channel-edit.vue'
// 导入本地储存的数据模块
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
    name: 'HomePage',
    data () {
      return {
         active: 0,
         channels: [], // 存储主页列表数据的数据数组
         isPopupBoxShow: false
      }
    },
   created () {
      this.loadChannels()
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      // 获取列表数据
     async loadChannels() {
        try {
          // const { data } = await getUserChannels()
          // console.log(data)

          let channelsArr = [] // 这是一个存储后台服务器数据的变量、
          // 判断用户是否有登录
          if (this.user) {
            // 已登录，请求获取用户频道列表 有同步的功能
            const { data } = await getUserChannels()
            channelsArr = data.data.channels
          } else {
            // 未登录的话判断本地是否有用户频道数据存储
            const loadChannels = getItem('TOUTIAO_CHANNELS') // 本地存储
            if (loadChannels) {
              // 本地有数据
              channelsArr = loadChannels
            } else {
              // 本地没有数据 则获取默认的频道列表 没有同步的功能
            const { data } = await getUserChannels()
            channelsArr = data.data.channels
            }
          }
          this.channels = channelsArr
        } catch (err) {
          this.$toast('获取列表失败') // 弹出层提示
        }
      },
      onAllChannel (onAllChannelval) {
        // console.log(onAllChannelval)
        // 把子组件传过来的值push到channels数组中
        this.channels.push(onAllChannelval)
      },
      onAlllJump (index, isPopupBoxShow = true) {
        this.active = index // 将在我的频道中点击的元素下表 从子组件中传到父组件，然后重新赋值给active 从而起到自动切换频道的效果
        this.isPopupBoxShow = isPopupBoxShow // 自动跳转
      },
      ondeleteChannel(index) {
        this.channels.splice(index, 1)
      }
    },
// 注册页面组件
    components: {
      ArticleList,
      ChannelEdit
    }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 180px;
 /deep/ .van-tabs__nav {
    padding-bottom: 0;
  }
  /deep/ .van-tabs__wrap { // 头部列表栏固定定位
    overflow: hidden;
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    z-index: 1111;
  }
  // /deep/可以修改vant一些因为作用域问题而导致未改不了样式的问题
 /deep/ .van-nav-bar__title {
    max-width: unset;
  }
 /deep/ .van-tab {
    font-size: 30px;
    color: #bbb;
    border-right: 1px solid #eee;
    min-width: 200px;
    // height: 82px;
  }
 /deep/ .van-tab--active {
       font-size: 35px;
       color: #111;
  }
 /deep/ .van-tabs__line {
    width: 40px !important;
    background-color:skyblue ;
    border-radius: 30%;
    bottom: 8px;
  }
  .home-search-btn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    color: #fff;
    background-color: #5babfb;
}
  .van-icon-search {
  font-size: 34px;
  color: #fff;
}
.channel-tabs {
  // position: fixed;
  // top: 92px;
  // left: 0;
  // right: 0;
  .cover-box {
   width: 66px;
   height: 82px;
   flex-shrink: 0; // 因为默认的父盒子是利用flex布局，而每个列表子盒子又平分了空间，所以这里把遮挡层设置为不参与平分空间
  }
  .menu-btn {
   position: fixed;
   right: 0;
   width: 66px;
   height: 82px;
   display: flex;
   justify-content: center; // 水平居中
   align-items: center;  // 垂直居中
   background-color: #fff;
   opacity: 0.8; // 添加背景透明度
   &::before {
     content: '';
     position: absolute;
     left: 0;
     width: 2px;
     height: 80%;
     background: url('~@/assets/gradient-gray-line.png');
     background-size: contain;  // 背景图片填充模式
   }
   i.icon-gengduo {
     font-size: 36px;
   }
  }
}

}

</style>