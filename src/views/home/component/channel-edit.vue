<template>
  <div class="channel-edit">
      <!-- 我的频道 -->
     <div class="my-channel">
          <van-cell :border="false">
          <div slot="title" class="my-channel-title">我的频道</div>
          <van-button type="danger" plain round="" size="small" class="edit-btn" @click="isEdit = !isEdit">{{isEdit?'完成':'编辑'}}</van-button>
      </van-cell>
      <van-grid :border="false" :gutter="10">
              <van-grid-item
              class="grid-item-box"
              v-for="(obj,index) in myChannels"
              :key="index"
              @click="onUserChannelsJump(obj,index)"
              >
              <!-- !fiexChannels.includes(obj.id) 是指fiexChannels里所指下标的值不包含在obj遍历的id中 -->
              <van-icon slot="icon"
              name="close"
              v-show="isEdit && !fiexChannels.includes(obj.id,index)">
              </van-icon>
              <span class="grid-item-title" slot="text" :class="{active : index === myActive}">{{obj.name}}</span>
              </van-grid-item>
      </van-grid>
     </div>
      <!-- / 我的频道 -->

       <!-- 推荐频道 -->
     <div class="rm-channel">
          <van-cell :border="false">
          <div slot="title" class="rm-channel-title">推荐频道</div>
      </van-cell>
      <van-grid :border="false" :gutter="10">
              <van-grid-item
              class="grid-item-box"
              :text="channel.name"
              icon="plus"
              v-for="(channel,index) in recommendChannels"
              :key="index"
              @click="onAllChannel(channel)"
              />
      </van-grid>
     </div>
       <!-- / 推荐频道 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
// 导入vuex辅助方法
import { mapState } from 'vuex'
// 导入本地存储模块
import { setItem } from '@/utils/storage'
export default {
    name: 'ChannelEdit',
    data () {
        return {
            allChannels: [], // 全部的频道数据
            isEdit: false, // 控制图标的显示与隐藏
            fiexChannels: [0]
        }
    },
    props: {
         myChannels: { // 获取主页的频道信息数据
             type: Array,
             required: true
        },
        myActive: {
            type: Number,
            required: true
        }
    },
    created () {
        this.loadAllChannels()
    },
    // 请求全部频道数据
    methods: {
        async loadAllChannels () {
           try {
               const { data } = await getAllChannels()
               this.allChannels = data.data.channels
           } catch (err) {
               this.$toast(err)
           }
        },
        // 把在推荐频道点击的对象通过子传父的方式 传给父组件  因为是发请求 所以需要用到async await
       async onAllChannel(channel) {
            this.$emit('channelval', channel)
            // 判断用户是否登录，登录的话user里面会储存数据，如果有存储数据的话，则把后台服务器存储的数据中重新渲染到页面上，否则旧直接在本地存储中获取
            if (this.user) {
                // 数据持久化 因为是请求，会有成功跟失败的结果，所以需要用到try catch
                try {
                 // 已登录，把数据储存到后台服务器
                   await addUserChannel({
                     id: channel.id,
                     seq: channel.length // 序列号
                 })
                 } catch (err) {
                    this.$toast('信息获取失败,请稍后重试')
                 }
                 } else {
                // 未登录，把数据储存到本地
                setItem('TOUTIAO_CHANNELS', this.myChannels)
            }
        },
        onUserChannelsJump(obj, index) {
            if (this.isEdit) {
                 // 当isEditfalse 显示关闭图标时，点击频道即可删除频道
                if (this.fiexChannels.includes(obj.id)) { // 这里只的是，如果是点击固定频道的话，则直接返回，不执行下面的删除操作
                    return
                }
                if (index <= this.myActive) { // 这里指的是,当点击删除当前频道前面的频道的时候，则myActive-1 再传给父组件，父组件的active拿到值后，再传到子组件的props中 再执行:class="{active : index === myActive}代码
                    this.$emit('onChannelsJump', this.myActive - 1)
                }
                this.$emit('deleteChannel', index)
                this.deleteChannels(obj)
            } else {
                // 非编辑状态 没有显示关闭图标的时候 则点击时自动跳转主页频道
              this.$emit('onChannelsJump', index, false)
            }
        },

        // 删除用户指定的数据频道
       async deleteChannels(obj) {
           try {
                if (this.user) {
                // 已登录 储存到服务器
                await deleteUserChannel(obj.id)
                 } else { // 未登录，保存到本地
                 setItem('TOUTIAO_CHANNELS', this.myChannels)
            }
           } catch (err) {
                this.$toast('删除失败,请稍后重试')
           }
        }
    },
    // 使用计算属性来得出 全部频道 - 已添加到我的频道 = 剩余的频道
    computed: {
        ...mapState(['user']),
        // 简易方法
        recommendChannels () {
            // 数组的filter 方法 遍历数组 把符合条件的元素存储到新数组中
           return this.allChannels.filter(channel => {
               // 下面指的是 遍历符合条件的元素,然后把符合条件的第一个元素返回 这里加！非  就是数组里不符合条件的元素
               return !this.myChannels.find(myChannels => {
                   return myChannels.id === channel.id
               })
            })
        }
        // recommendChannels () {
        //     const channels = []
        //     this.allChannels.forEach(channel => {
        //          // find是指遍历符合条件的数据
        //        const red = this.myChannels.find(mychannel => {
        //            return mychannel.id === channel.id
        //        })
        //        if (!red) {
        //            channels.push(channel)
        //        }
        //     })
        //     return channels
        // }
    }
}
</script>

<style lang="less" scoped>
 .channel-edit {
  padding: 85px 0 ;
  .my-channel {
      .my-channel-title {
          font-size: 32px;
          color: #333;
          font-weight: 600;
      }
/deep/ .grid-item-box { // 给关闭图标设置定位
          .van-grid-item__content  {
              .van-grid-item__icon-wrapper {
                  position: unset;
              }
              .van-icon-close {
                  position: absolute;
                  top:-15px;
                  right: 10px;
                  font-size: 38px;
                  color: #aaa;
              }
          }
  }
  .edit-btn {
      width: 104px;
      height: 48px;
      line-height: 44px;
      font-size: 26px;
  }
  }
/deep/ .rm-channel {
          .rm-channel-title {
             font-size: 32px;
             color: #333;
             font-weight: 600;
      }
          .grid-item-box {
             .van-grid-item__content {
                flex-direction: row !important;
                justify-content: center;
                .van-icon-plus {
                    font-size: 28px;
                    font-weight: 600;
                }
            }
      }
  }
  /deep/ .grid-item-box {
       width: 160px;
       height: 86px;
       .van-grid-item__content {
           white-space: nowrap; // 禁止折行
            background-color: #f4f5f6 !important;
           .van-grid-item__text, .grid-item-title{
                font-size: 28px;
                color: #222;
                margin-left: 4px;
                margin-top:0;
                line-height: 1;
       }
    }
  }
  /deep/ .active {  // 主页列表频道点击哪个，在汉堡列表频道则哪个频道采用此类名
      color: red !important;
  }
 }
</style>>
