<template>
<div class="pagetab">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 子路由出口 -->

    <!-- 标签导航栏 -->
    <!--
       route 开去路由模式
     -->
     <van-tabbar route >
      <van-tabbar-item lost="icon" class="iconfont icon-shouye iconRt" to="/">
          <span class="textRt">首页</span>
      </van-tabbar-item>
      <van-tabbar-item lsot="icon" class="iconfont icon-wenda iconRt" to="/qa">
          <span class="textRt">问答</span>
      </van-tabbar-item>
      <van-tabbar-item lsot="icon" class="iconfont icon-shipin iconRt" to="/video">
          <span class="textRt">视频</span>
      </van-tabbar-item>
      <van-tabbar-item lsot="icon" class="iconfont icon-wode iconRt" to="/my">
          <span class="textRt">{{user?'我的':'未登录'}}</span>
      </van-tabbar-item>
     </van-tabbar>
    <!-- 标签导航栏 -->
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
 name: 'LayoutIndex',
 data() {
    return {
      active: 0
    }
  },
  computed: {
      ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.iconRt {
    font-size:40px;
    .textRt {
        font-size: 25px;
    }
}
.pagetab {
    margin-bottom: 100px;
}
</style>