<template>
  <div class="comment-reply">
    <van-nav-bar
    :title="CommentReplyData.reply_count > 0 ? CommentReplyData.reply_count+'条回复' : '暂无回复'"
    >
    <!-- 当前点击的评论对象 -->
    </van-nav-bar>
    <CommentItem
    :CommentItemList="CommentReplyData"
    />
    <!-- 当前点击的评论对象 -->
    <!-- 全部评论回复 -->
    <van-cell
    title="全部回复"
    class="cellBorder"
    />
    <div class="scroll-wrap">
        <CommentList
        :type="'c'"
        :articleId="CommentReplyData.com_id"
        :list="commentData"
    />
    </div>
    <!-- 全部评论回复 -->
      <!-- 底部回复输入框 -->
    <div class="post-wrap">
        <van-button
        class="post-btn"
        round
        @click="showPopup"
        >
            写回复
        </van-button>
    </div>
    <!-- 底部回复输入框 -->
    <!-- 发布评论回复的弹层 -->
    <van-popup
        v-model="likeShow"
        position="bottom"
        >
        <CommentPost
        :commentId="CommentReplyData.com_id"
        @onCommentPost="onPostSuccess"
        />
        </van-popup>
    <!-- 发布评论回复的弹层 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
    name: 'CommentReply',
    data () {
        return {
            likeShow: false,
            replyCountData: null,
            commentData: []
        }
    },
    props: {
        CommentReplyData: {
            type: [Object, String, Number],
            required: true
        }
    },
    components: {
        CommentItem,
        CommentList,
        CommentPost
    },
    methods: {
        showPopup() {
            this.likeShow = true
        },
        onPostSuccess(data) {
           this.replyCountData = this.CommentReplyData.reply_count
           this.likeShow = false
           this.$emit('ReplyCountData', this.replyCountData++)
           this.commentData.unshift(data.new_obj)
        }
    }
}
</script>

<style scoped lang="less">
.comment-reply {
    padding-bottom: 88px;
  /deep/ .cellBorder {
        border-bottom: 0 !important;
    }
    .scroll-wrap {
        position: fixed;
        top: 688px;
        left: 0;
        right: 0;
        bottom: 88px;
        overflow-y: auto; // 显示滚动条
    }
    .post-wrap {
      position: fixed;
      bottom: 0;
      left:0;
      right: 0;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #eee;
      background-color: #fff;
        .post-btn {
           width: 60%;
           height: 80%;
           line-height: 1;
        }
    }
}

</style>