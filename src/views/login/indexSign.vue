<template>
  <div class="login-container">
    <!-- 导航栏模块 -->
    <van-nav-bar
   title="登录页面"
   class="page-nav-login"
   >
   <!-- @click="$router.back() 是指返回上一层 -->
   <div slot="left" class="boxReturn" @click="$router.back()">
    <van-icon name="arrow-left" class="iconReturn"/>
    <span class="textReturn">返回</span>
   </div>
   </van-nav-bar>
    <!-- 导航栏模块 -->

    <!-- 登录表单模块 -->
    <van-form @submit="onSubmit"  ref="loginFrom">
  <!-- 手机号
     required是指必填项目
   -->
  <van-field
    required
    v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="userFromRules.mobile"
    type="number"
    maxlength="11"
  >
  <i slot="left-icon" class="iconfont icon-shouji sjicon-Size"></i>
  </van-field>
  <!-- 手机号 -->
  <!-- 验证码 -->
  <van-field
    v-model="user.code"
    name="code"
    placeholder="请输入验证码"
    :rules="userFromRules.code"
    type="number"
    maxlength="6"
  >
  <i slot="left-icon" class="iconfont icon-yanzhengma sjicon-Size"></i>
  <!-- 发送验证码按钮 -->
  <template #button>
    <van-count-down :time="time" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
    <van-button class="send-sms-btn" round size="small" type="default" @click="onSendSms" native-type="button" v-else>发送验证码</van-button>
  </template>
  </van-field>
  <!-- 验证码 -->
  <div class="login-wrap-btn">
    <van-button  block type="info" native-type="submit" >登录</van-button>
  </div>
</van-form>

  </div>
</template>

<script>
// 按需加载相关请求模块
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
   data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      time: 60 * 1000,
      // from输入框验证规则
      userFromRules: {
        mobile: [{
            required: true, // 是否是必填项
            message: '手机号码不能为空'
          },
          {
            pattern: /^1[1|3|4|7|8|9]\d{9}$/, // 正则验证规则
            message: '手机号码格式有误' // 提示文本
          }
          ],
        code: [{
             required: true,
             message: '验证码不能为空'
           },
           {
             pattern: /^\d{6}$/,
             message: '验证码输入格式有误'
           }
           ]
        },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    // 给登录按钮注册点击事件
     async onSubmit () {
       // 给表单验证设置轻提示
     this.$toast.loading({
     message: '登录中', // 提示文本
     forbidClick: true, // 禁用背景点击
     duration: 0 // 显示时长
})
     // 提交表单登录请求
     try {
     const { data } = await login(this.user)
    //  console.log('登录成功')
     this.$store.commit('setUser', data.data)
     this.$toast.success('登录成功')
     // 登录成功，跳转回原来的页面
     // back的方法不严谨，后面会有细讲
     this.$router.back() // 跳转回上一次
    } catch (err) {
     if (err.response.status === 400) {
       // 报错显示400 则说明是输入框输入格式有问题
       this.$toast.fail('输入格式有误，请重新输入')
     } else {
       // 如果不是以上的问题，则可能是网络等因素导致，则直接反馈错误结果
       this.$toast.fail('登录失败')
     }
    }
    },
    async onSendSms () {
      console.log('onSendSms')
     // 校验手机号
     try {
           await this.$refs.loginFrom.validate('mobile')
     } catch (err) {
       // 如果出现错误 则直接返回 不执行下面的代码
          return console.log('验证失败', err)
     }
     // 验证通过，显示倒计时
     this.isCountDownShow = true // 当校验手机号码成功并点击发送验证码时显示倒计时
     // 请求发送验证码
     try {
           await sendSms(this.user.mobile)
             this.$toast('发送成功')
     } catch (err) {
           console.log(err)
         this.isCountDownShow = false // 如果发送失败，则不显示倒计时
       if (err.response.status === 429) {
         this.$toast('发送太频繁，请稍后重试')
       } else {
         this.$toast('发送失败，请重试')
       }
     }
    }
  }
}
</script>

<style scoped lang="less">
.sjicon-Size {
  font-size: 38px;
}
.send-sms-btn {
  background-color: #ededed;
  width: 158px;
  height: 42px;
  line-height: 40px;
  .van-button--small {
    font-size: 22px;
    color: #666666;
}
}
.van-button--info {
  background-color: #6db4fb;
  border: 0;
}
.login-wrap-btn {
  padding: 53px 23px;
}
.van-nav-bar__text {
  color: #fff!important;
}
.boxReturn {
 display: flex;
 align-items: center;
  .textReturn {
    font-size: 30px;
    color:#fff
  }
  .iconReturn {
  color: #fff;
  font-size: 40px;
  }
}
</style>