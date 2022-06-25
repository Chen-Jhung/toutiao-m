<template>
  <van-icon
        color="#777"
        :name=" value === 1? 'good-job-o' : 'good-job'"
        :loading="likeloading"
        :class="{
            Likearticle: value !== 1
            }"
        @click="onLikeArticle"
      />
</template>

<script>
import { postLikeArticle, deleteLikeArticle } from '@/api/article'
export default {
    name: 'article-like',
    data () {
        return {
            likeloading: false
        }
    },
    props: {
        value: {
            type: Number,
            required: true
        },
        likeArticleId: {
            type: [Object, String, Number],
            required: true
        }
    },
    methods: {
       async onLikeArticle() {
            this.likeloading = true
            let status = -1
            try {
                if (this.value === 1) {
                    // 已点赞 打算取消点赞
                  await deleteLikeArticle(this.likeArticleId)
                } else {
                    // 没点赞，准备点藏
                  await postLikeArticle(this.likeArticleId)
                  // 当点赞后把status的值重新赋值为1 ，表示已经是点赞状态了
                  status = 1
                }
                this.likeloading = false
                this.$emit('input', status) // 把status 的值重新赋值给 父组件的attitude
                this.$toast.success(this.value === 1 ? '点赞成功' : '取消点赞')
            } catch (err) {
                this.$toast.fail(`出现错误,请重试${err}`)
                console.log(err)
            }
        }
    }
}
</script>

<style scoped lang="less">
.Likearticle {
    color: #e5645f !important;
}
</style>