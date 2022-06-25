<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="CommentItemList.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{CommentItemList.aut_name}}</div>
      <van-button
        class="like-btn"
        :icon="CommentItemList.is_liking? 'good-job' : 'good-job-o'"
        :class="{
            linke:CommentItemList.is_liking
            }"
        @click="onCommentlike"
      >{{CommentItemList.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{CommentItemList.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{CommentItemList.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('commentReply', CommentItemList)"
        >回复 {{CommentItemList.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    CommentItemList: {
        type: Object,
        required: true
    }
  },
  data () {
    return {
        // loadingLike: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onCommentlike () {
        // this.loadingLike = true
        let commentNumber = 0
            commentNumber = this.CommentItemList.like_count
        try {
            if (this.CommentItemList.is_liking) {
              // 已赞，点击取消点赞
              await addCommentLike(this.CommentItemList.com_id)
                commentNumber--
            } else {
              // 未赞，点击确定点赞
                await deleteCommentLike(this.CommentItemList.com_id)
                commentNumber++
            }
                // console.log(commentNumber)
                this.$emit('commentNum', commentNumber)
                //  this.CommentItemList.is_liking = !this.CommentItemList.is_liking
                this.$emit('commentliking', !this.CommentItemList.is_liking)
        } catch (err) {
            this.$toast('操作失败，请稍后重试')
        }
        //  this.loadingLike = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
 .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.linke{
        color: #e22829 !important;
    }
  }
}
</style>