<template>
<van-icon
        color="#777"
        :name="value ?'star' : 'star-o'"
        :loading="loagdingArticle"
        :class="{
            collearticle: value
            }"
        @click="onColleArticle"
      />
</template>

<script>
import { postColleArticle, deleteColleArticle } from '@/api/article'
export default {
    name: 'article-colle',
    data () {
        return {
         loagdingArticle: false
        }
    },
    props: {
        value: {
            type: Boolean,
            required: true
        },
        colleArticleId: {
            type: [Object, String, Number],
            required: true
        }
    },
    methods: {
       async onColleArticle() {
        this.loagdingArticle = true
        try {
            if (this.value) {
            await postColleArticle(this.colleArticleId) // 请求收藏文章
            } else {
            await deleteColleArticle(this.colleArticleId) // 请求取消收藏文章
            }
            this.$emit('input', !this.value) // 这代码不是立即执行，因为他需要把值传送到父组件中去
            // 因为上面代码不是立即执行，所以success中的第一个参数可以加个！就是非得意思
            this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
        } catch (err) {
            this.$toast.fail('操作失败，请稍后重试')
        }
            this.loagdingArticle = false
        }
    }
}
</script>

<style scoped lang="less">
 .collearticle {
        color :#ffa500!important;
}
</style>