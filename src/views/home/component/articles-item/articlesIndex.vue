<template>
<!-- 文章列表项组件 -->
  <div class="articles-item">
      <van-cell :to="`/article/${articles.art_id}`">
          <!-- 文章标题模块 -->
          <div slot="title" class="title van-multi-ellipsis--l2">{{articles.title}}</div>
          <!-- 底部信息模块 -->
          <div slot="label">
              <!-- 底部图片 -->
              <div class="cover-warp"  v-if="articles.cover.type === 3">
                 <div class="cover-item" v-for="(imgbj,index) in articles.cover.images" :key="index">
                    <van-image
                       :src="imgbj"
                       fit="corve"
                       class="cover-item-img"
                    />
                 </div>
              </div>
              <!-- 底部文本 -->
              <div class="bottom-text-box" >
                  <span>{{articles.aut_name}}</span>
                  <span>{{articles.comm_count}}评论</span>
                   <!-- relativeTime 是过滤器的名称 ， 已经使用vue全局配置 -->
                  <span>{{articles.pubdate | relativeTime}}</span>
              </div>
          </div>
          <!-- 图片模块 -->
          <div slot="default" class="right-corve" v-if="articles.cover.type === 1">
              <van-image
                 fit="cover"
                 :src="articles.cover.images[0]"
              />
          </div>
      </van-cell>
  </div>
</template>

<script>
export default {
    name: 'ArticlesItem',
    props: {
        articles: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="less">
 .articles-item {
     border-bottom: 1px solid #eee;
     .title {
         font-size: 32px;
         color:#3a3a3a
     }
     .van-cell__value {
         flex: unset; // 去除flex布局
         width: 232px; // 设置图片容器的高度以及宽度
         height: 146px;
         padding-left: 25px;
         .right-corve {
         width: 232px; // 设置图片的高度以及宽度
         height: 146px;
         }
     }
     .bottom-text-box {
         font-size:22px;
         color: #b4b4b4;
         span {
             margin-right: 25px;
         }
     }
     .cover-warp {
         display: flex;
         padding: 5px 0;
         .cover-item {
             flex: 1;
             padding: 10px 0;
             &:nth-child(2) {
                     margin: 0 8px;
                 }
             .cover-item-img {
                 width: 232px; // 设置图片的高度以及宽度
                 height: 146px;
             }
         }
     }
 }
</style>