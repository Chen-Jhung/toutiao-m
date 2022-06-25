<template>
 <!-- 关注与已关注按钮模块 -->
   <van-button
           v-if="fllowSwitch"
           @click="onFollow"
            class="follow-btn"
            round
            size="small"
            :loading="loadingFollowed"
          >
          已关注
         </van-button>
    <van-button
           v-else
           @click="onFollow"
            class="follow-btn"
            type="info"
            color="#3296fa"
            :loading="loadingFollowed"
            round
            size="small"
            icon="plus"
          >
          关注
    </van-button>
</template>

<script>
// 导入关注以及取消用户的信息接口
import { onAddFollow, onDeleteFollow } from '@/api/user'
export default {
    name: 'FollowUser',
    data () {
        return {
            loadingFollowed: false // 关注/已关注的加载状态开关
        }
    },
    model: {
        prop: 'fllowSwitch', // 默认时value
        event: 'isfllowId' // 默认时input
    },
    props: {
        fllowSwitch: { // 关注与已关注切换开关
            type: Boolean,
            required: true
        },
        fllowId: { // 关注的用户id
            type: [Object, String, Number]
        }
    },
    methods: {
        async onFollow () {
        // 当点击时 触发点击事件则开启加载状态
        this.loadingFollowed = true
         try {
            // 请求成功
            if (this.fllowSwitch) {
              // 已关注
            const { data } = await onAddFollow(this.fllowId)
            console.log(data)
            } else {
            const { data } = await onDeleteFollow(this.fllowId)
            console.log(data)
            }
            // 关注与已关注按钮的切换
            this.$emit('isfllowId', !this.fllowSwitch)
         } catch (err) {
            // 请求失败
            let message = '操作错误，请稍后重试'
            if (err.response && err.response.status === 400) { // 400 表示关注自己时出现错误
                message = '操作错误，您不能关注自己'
            }
              this.$toast(message)
         }
        this.loadingFollowed = false // 数据加载完毕则关闭加载状态
       }
    }
}
</script>

<style>

</style>