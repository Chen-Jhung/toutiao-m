<template>
  <div class="post-comment">
    <!-- v-model.trim 是指把空格字符不算入文本文字长度中 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <!-- :disabled="!message.length"是指当输入框中的文本长度为0时 启动禁用按钮的方法 -->
    <van-button
      type="primary"
      size="small"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommentPost } from '@/api/comment'
export default {
  name: 'PostComment',
  components: {},
  props: {
    commentId: {
        type: [Number, String, Object],
        required: true
    }
  },
    inject: { // 依赖注入
        articleId: {
            type: [String, Object, Number],
            default: null // 有则传 ，没有就不传
        }
    },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
   async onPost () {
    // 发布提示文本
     this.$toast.loading({
     message: '发布中', // 提示文本
     forbidClick: true, // 禁用背景点击
     duration: 0 // 显示时长
  })
        // 提交发布数据
        try {
            const { data } = await addCommentPost({ // 提交请求 获取新评论数据
                target: this.commentId.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
                content: this.message, // 评论内容
                art_id: this.articleId ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
            })
             console.log(data)

             this.$emit('onCommentPost', data.data) // 把数据传给父组件
             // 清空文本框
             this.message = ''
             this.$toast.success('发布成功')
        } catch (err) {
            console.log(err)
            this.$toast.fail('发布失败')
        }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
