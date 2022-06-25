<template>
  <div class="details-container">
     <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="IT趣圈头条"
    >
    <div slot="left" class="Upperevel"  @click="Upperevel">
    <van-icon name="arrow-left" />
    </div>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <!-- v-else-if="searchcontainer.title" 是指 判断searchcontainer是否有内容，有的话则判断成功显示，没有的话则为null 则不显示 -->
      <div v-else-if="searchcontainer.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{searchcontainer.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="searchcontainer.aut_photo"
          />
          <div slot="title" class="user-name">{{searchcontainer.aut_name}}</div>
          <div slot="label" class="publish-date">{{ searchcontainer.pubdate | relativeTime }}</div>
          <!-- 当我们船体给子组件的数据纪要使用还要修改
            传递：props
          :fllowSwitch="searchcontainer.is_followed"
            修改: 自定义事件
          @fllowSwitch="searchcontainer.is_followed = $event"
          简写方式，在组件上使用 v-model
          value=searchcontainer.is_followed
          @input="searchcontainer.is_followed = $event"

          如果需要修改 v-model 的规则名称，可以通过子组件的model修改

          一个组件上只能使用哦个一次 v-model
          如果有多个数据需要实现类似于 v-model 的效果 可以使用属性的 .sync 修饰符
           -->
          <FollowUser
          :fllowId="searchcontainer.aut_id"
          v-model="searchcontainer.is_followed"
          class="follow-btn"
          />
          <!-- <van-button
           v-if="searchcontainer.is_followed"
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
           <van-button
           v-else
           @click="onFollow"
            class="follow-btn"
            round
            size="small"
            :loading="loadingFollowed"
          >
          已关注
          </van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <!-- ref="article-content" 是指获取该DOM节点的信息 -->
        <div
        class="article-content markdown-body"
        v-html="searchcontainer.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
         <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPopup"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :info="commentNumList"
            color="#777"
          />
          <ArticleColle
          v-model="searchcontainer.is_collected"
          :colleArticleId="searchcontainer.art_id"
          />
          <!-- <van-icon
            color="#777"
            name="star-o"
          /> -->
          <ArticleLike
          v-model="searchcontainer.attitude"
          :likeArticleId="searchcontainer.art_id"
          />
          <!-- <van-icon
            color="#777"
            name="good-job-o"
          /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论区域 -->
        <CommentList
        :articleId="searchcontainer.art_id"
        @commentNum="commentNum"
        :list="addCommentList"
        @commentItemReply="onCommentItemReply"
        />

        <!-- 评论输入框 -->
        <van-popup
        v-model="likeShow"
        position="bottom"
        >
        <CommentPost
        :commentId="searchcontainer.art_id"
        @onCommentPost="commentPostState"
        />
        </van-popup>
        <!-- 评论输入框 -->

        <!-- 评论区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="articleContainer">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

     <!-- 评论回复区 -->
     <van-popup
        v-model="replyShow"
        position="bottom"
        :style="{ height: '80%' }"
        round
        close-icon-position="top-left"
        closeable
        >
        <!-- v-if="replyShow" 下面代码加if的原因是，让每次点击回复加载回复内容的时候都重新加载，不让会导致每条评论回复的内容都一样 -->
        <CommentReply
        v-if="replyShow"
        :CommentReplyData="CommentReplyMark"
        @ReplyCountData="CommentReplyMark.reply_count = $event"
        />
        </van-popup>
     <!-- 评论回复区 -->
  </div>
</template>

<script>
import { getArticlesContainer } from '@/api/article'
// 引入图片预览组件
import { ImagePreview } from 'vant'
import FollowUser from '@/component/follow-user.vue'
import ArticleColle from '@/component/article-colle.vue'
import ArticleLike from '@/component/article-like.vue'
import CommentList from '@/views/article/comment-list.vue'
import CommentPost from '@/views/article/comment-post.vue'
import CommentReply from './commen-reply.vue'

export default {
     name: 'DetailsIndex',
     data () {
       return {
       searchcontainer: {}, // 储存文章详情页的内容
       loading: true, // 控制加载状态 默认是true 开启状态
       errStatus: 0, // 失败的状态码
      //  loadingFollowed: false // 关注/已关注的加载状态开关
       commentNumList: null, // 评论小图标数据显示
       likeShow: false, // 评论弹框的开关
       addCommentList: [], // 评论列表
       replyShow: false, // 评论回复弹窗开关
       CommentReplyMark: {} // 点击的评论回复的对象数据
       }
     },
     props: {
       // 从路由组件中接收id参数
       articleId: {
         type: [Number, String, Object],
         required: true
       }
     },
     provide: function() { // 依赖注入
      return {
        articleId: this.articleId
      }
     },
     created () {
       // 初始调用此方法
       this.articleContainer()
     },
     methods: {
      async articleContainer () {
        try {
          this.loading = true // 重新发请求时重新开启加载模式
          // 加载成功
         const { data } = await getArticlesContainer(this.articleId) // 传id参数
         console.log(data)
         // 测试： 随机报错
        //  if (Math.random > 0.5) {
        //    JSON.parse('sahdiahsoihahf')
        //  }

        // 注意：数据驱动试图这件事不是立即的
         this.searchcontainer = data.data // 重新赋值
        // 注意：数据驱动试图这件事不是立即的，所以可以给个定时器
         setTimeout(() => {
        // 获取refDOM节点信息的方法
            this.previewImage()
        }, 0)
        } catch (err) {
          // 加载失败
          if (err.response || err.response.status === 404) {
            this.errStatus = 404
          }
          console.log('获取失败', err)
        }
        // 无论是加载成功还是加载失败，都关闭loading 加载状态
        this.loading = false
       },
       Upperevel() {
         this.$router.back() // 返回上一级
       },
       // 处理ref DOM节点的元素信息的方法
       previewImage() {
         // 获取ref DOM元素的信息
         const articlePreviesImage = this.$refs['article-content']
         // 获取DOM节点元素
        const imgs = articlePreviesImage.querySelectorAll('img')
        // console.log(imgs)
        const images = [] // 用于存放内容详情页的视图数据
        // 遍历试图
        imgs.forEach(img => {
          images.push(img.src)
          // 给试图绑定点击事件
          img.onclick = () => {
            // 这是vant中的img试图预览方法
             ImagePreview({
               images: images,
               onClose() {
                 // Toast('关闭');
               }
               // startPosition: 1 图片预览其实位置索引
             })
          }
        })
        // console.log(images)
       },
       commentNum(value) { // 子组件传过来的评论数据
        this.commentNumList = value.total_count
       },
       // 点击打开评论区
       showPopup() {
        this.likeShow = true
       },
       commentPostState(data) {
        // 关闭弹出层
        this.likeShow = false
        // 将发布内容显示到列表顶部
        this.addCommentList.unshift(data.new_obj)
       },
       onCommentItemReply(val) { // 点击哪个评论回复 就传哪个评论回复的id数据过来
        console.log(val)
        this.CommentReplyMark = val
        this.replyShow = true
       }
      // async onFollow () {
      //   // 当点击时 触发点击事件则开启加载状态
      //   this.loadingFollowed = true
      //    try {
      //       // 请求成功
      //       if (this.searchcontainer.is_followed) {
      //         // 已关注
      //       const { data } = await onAddFollow(this.searchcontainer.aut_id)
      //       console.log(data)
      //       } else {
      //       const { data } = await onDeleteFollow(this.searchcontainer.aut_id)
      //       console.log(data)
      //       }
      //       // 关注与已关注按钮的切换
      //       this.searchcontainer.is_followed = !this.searchcontainer.is_followed
      //    } catch (err) {
      //       // 请求失败
      //       let message = '操作错误，请稍后重试'
      //       if (err.response && err.response.status === 400) { // 400 表示关注自己时出现错误
      //           message = '操作错误，您不能关注自己'
      //       }
      //         this.$toast(message)
      //    }
      //   this.loadingFollowed = false // 数据加载完毕则关闭加载状态
      //  }
     },
     components: {
       FollowUser,
       ArticleColle,
       ArticleLike,
       CommentList,
       CommentPost,
       CommentReply
     }
}
</script>

<style scoped lang="less">
// 导入文章详情页样式插件
@import './articleCss/github-markdown.css';

.details-container {
 /deep/ .van-nav-bar__left {
    padding-left: 14px !important;
  }
  .Upperevel {
    line-height: 1;
    .van-icon-arrow-left {
      font-size: 40px;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>