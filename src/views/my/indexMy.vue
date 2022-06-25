<template>
  <div class="my-container">
    <!-- 已登录 账号信息板块 -->
    <div class=" header user-Info" v-if="user">
      <div class="bese-info">
        <div class="left">
          <van-image
           round
           class="avasee"
           fit="cover"
           :src="userInfo.photo"
           />
            <span class="textName">{{userInfo.name}}</span>
        </div>
           <div class="right">
             <van-button round size="small" to="/user/profile">编辑资料</van-button>
           </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="Count">{{userInfo.art_count}}</span>
          <span class="Text">头条</span>
        </div>
        <div class="data-item">
          <span class="Count">{{userInfo.follow_count}}</span>
          <span class="Text">关注</span>
        </div>
        <div class="data-item">
          <span class="Count">{{userInfo.fans_count}}</span>
          <span class="Text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="Count">{{userInfo.like_count}}</span>
          <span class="Text">获赞</span>
        </div>
      </div>
    </div>
    <!--已登录 账号信息板块 -->

    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <!-- @click="$router.push('/login') 是指点击后自动跳转登录页面 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="">
        <span class="text-sign">注册/登录</span>
      </div>
    </div>
    <!-- 收藏与历史导航板块 -->
    <van-grid clickable :column-num="2" class="grid-nav">
     <van-grid-item class="grid-item" to="">
       <i slot="icon" class="iconfont icon-shoucang"></i>
       <span slot="text" class="sc-text">收藏</span>
     </van-grid-item>
     <van-grid-item class="grid-item" >
       <i slot="icon" class="iconfont icon-lishi"></i>
       <span slot="text" class="ls-text">历史</span>
     </van-grid-item>
    </van-grid>
    <!-- 收藏与历史导航板块 -->

    <!-- 小智同学以及退出登录板块 -->
     <van-cell-group class="help-box">
       <van-cell title="消息通知" is-link />
       <van-cell title="小智同学" is-link />
     </van-cell-group>
     <van-cell title="退出" class="sign-out" v-if="user" @click="onLogout" clickable/>
    <!-- 小智同学以及退出登录板块 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { geiUserInfo } from '@/api/user'
export default {
    name: 'MyPage',
    data () {
      return {
        userInfo: {} // 储存用户信息
      }
    },
    created () {
      if (this.user) { // 如果user里面有数据的话，则进入判断后的执行代码
        this.loginUserinfo()
      }
    },
    // 将mapState容器里面的数据映射到这个组件当中
    computed: {
      ...mapState(['user'])
    },
    methods: {
      // 退出提示
      // 在组件中需要使用this.$dialog 来调用弹框组件
      onLogout() {
   this.$dialog.confirm({
     message: '确定要退出登录吗？'
   })
    .then(() => { // 点击确定的时候
    // 清楚登录状态（容器中的user+本地存储的user）
    this.$store.commit('setUser', null)
   })
    .catch(() => { // 点击取消按钮的时候
    console.log('您取消退出登录')
   })
      },
      async loginUserinfo () {
        try {
          const { data } = await geiUserInfo() // 结构数据，从数据里面提取data数据
          console.log(data)
          this.userInfo = data.data
        } catch (err) {
          this.$toast('信息获取失败,请稍后重试')
        }
      }
    }
}
</script>

<style scoped lang="less">
.my-container{
  margin: 0;
  padding: 0;
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center; //水平居中
    align-items: center; // 垂直居中
    .login-btn {
      display: flex;
      flex-direction: column; //垂直排布
      justify-content: center; //水平居中
      align-items: center;
      img {
        width: 150px;
        margin-bottom: 15px;
      }
      .text-sign {
        font-size: 50px;
        color: #fff;
      }
    }
  }
  .user-Info {
    .bese-info {
      height: 231px;
      padding: 72px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between; // 贴边对齐
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avasee {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .textName {
          font-size: 40px;
          color: #fff;
          margin-left: 20px;
        }
      }
    }
    .data-stats {
      // height: 130px;
      // background-color: #ccc;
      display: flex;
        .data-item {
          height: 130px;
          color: #fff;
          flex: 1;
          display: flex;
          flex-direction: column; // 垂直分布
          justify-content: center;  // 水平居中
          align-items: center; // 垂直居中
          .Count {
            font-size: 36px;
          }
          .Text {
            font-size: 23px;
          }
        }
    }
  }
  //收藏与历史样式
  .grid-nav {
    .grid-item {
      height: 141px;
      .icon-shoucang {
        font-size: 45px;
        color: #ed5253;
      }
      .icon-lishi {
        font-size: 45px;
        color: #ff9d1d;
      }
      .sc-text,.ls-text {
        font-size: 28px;
      }
    }
  }

  // 消息通知小智同学与退出样式
.help-box {
  margin: 8px 0;
}
.sign-out {
  height: 100px;
  text-align: center;
  font-size: 30px;
  color: #ed5253;
}
}
</style>