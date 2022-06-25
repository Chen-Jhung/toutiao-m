<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      class="page-nav-login"
      @click-left="$router.back()"
    />
    <!-- 头像图片选择器
    hidden 是隐藏
    change 是监听元素发生改变的时候触发事件
    -->
    <input
      type="file"
      hidden
      ref="fileBtn"
      @change="onFileHead"
    >

   <van-cell
     title="头像"
     is-link=""
     @click="$refs.fileBtn.click()">
   <van-image
    round
    fit="cover"
    :src="user.photo"
    class="userHead"
    />
   </van-cell>
   <van-cell title="名称" :value="user.name" is-link="" @click="isProfileNameShow = true" />
   <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link="" @click="isProfileGenderShow = true"/>
   <van-cell title="生日" :value="user.birthday" is-link="" @click="isProfileBirthdayShow=true"/>
  <!-- 修改头像 -->
  <van-popup
     v-model="isProfilePhotoShow"
     position="bottom"
     :style="{ height: '100%' }"
     >
     <upDatePhoto
     v-if="isProfilePhotoShow"
     :img="img"
     @close="isProfilePhotoShow = false"
     @update-photo="user.photo = $event"
     />
     </van-popup>
  <!-- 修改名称 -->
   <van-popup
     v-model="isProfileNameShow"
     position="bottom"
     :style="{ height: '100%' }"
     >
   <upDateName
    v-model="user.name"
    @close="isProfileNameShow = false"
    class="upDateBj"
   />
   </van-popup>
   <!-- 修改性别 -->
    <van-popup
     v-model="isProfileGenderShow"
     position="bottom"
     >
     <upDateGender
     v-model="user.gender"
     @close="isProfileGenderShow = false"
     v-if="isProfileGenderShow"
     />
     </van-popup>
     <!-- 修改生日 -->
     <van-popup
     v-model="isProfileBirthdayShow"
     position="bottom"
     >
     <!-- v-if="isProfileBirthdayShow" 动态销毁 -->
     <upDateBirthday
     v-if="isProfileBirthdayShow"
     v-model="user.birthday"
     @close="isProfileBirthdayShow = false"
     />
     </van-popup>
  </div>
</template>

<script>
import { getUserUpdate } from '@/api/userupdate'
import upDateName from './upDateName'
import upDateGender from './upDateGender'
import upDateBirthday from './upDateBirthday.vue'
import upDatePhoto from './upDatephoto.vue'
export default {
    name: 'UserProfile',
    data () {
      return {
        isProfileNameShow: false, // 编辑头像弹层的开关
        user: [],
        isProfileGenderShow: false, // 编辑性别弹层的开关
        isProfileBirthdayShow: false, // 编辑生日弹层的开关
        isProfilePhotoShow: false, // 编辑头像弹窗的开关
        img: null // 存储照片的容器
      }
    },
    created() {
      this.loadUserProfile()
    },
    methods: {
     async loadUserProfile() {
        try {
          const { data } = await getUserUpdate()
          console.log(data)
          this.user = data.data
        } catch (err) {
          console.log(err)
        }
      },
      onFileHead() {
        // 获取DOM元素中的第一个子元素
        const fileBen = this.$refs.fileBtn.files[0]
        // 基于文章获取 blob 数据
        const data = window.URL.createObjectURL(fileBen)
        this.img = data // 将获取到的图片url 传给子组件
        console.log(data)
        // 展示预览图片弹出层
        this.isProfilePhotoShow = true
        // file-input 如果选了同一个文件不会触发@chang事件
        // 解决办法就是每次使用完毕，把它的value清空
        console.log(this.$refs.fileBtn.value)
        this.$refs.fileBtn.value = ''
      }
    },
    components: {
      upDateName,
      upDateGender,
      upDateBirthday,
      upDatePhoto
    }
}
</script>

<style scoped lang="less">
  .user-profile{
  /deep/ .van-nav-bar__left{
    .van-icon-arrow-left,.van-nav-bar__text{
        color: #fff ;
    }
    }
    .userHead {
        width: 60px;
        height: 60px;
        line-height: 1;
    }
    .upDateBj {
      background-color: #f5f7f9;
      height: 100%;
    }
  }
</style>