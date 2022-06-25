<template>
  <div class="update-photo">
    <img :src="img" alt="" class="images" ref="images">
    <div class="editPhoto">
        <div class="cancel" @click="$emit('close')">取消</div>
        <div class="complete" @click="onComplete">完成</div>
    </div>
  </div>
</template>

<script>
import { getUserPhoto } from '@/api/userupdate'
// 裁剪样式
import 'cropperjs/dist/cropper.css'
// 导入图片裁剪样式包
import Cropper from 'cropperjs'
export default {
    name: 'upDatePhoto',
    data () {
        return {
          cropper: null
        }
    },
    props: {
        img: {
            type: [Object, String],
            required: true
        }
    },
    mounted () {
        const image = this.$refs.images
        this.cropper = new Cropper(image, {
         viewMode: 1, // 画布的比例 限制裁剪框不超过画布的大小。
         dragMode: 'move', // 拖动模式 move为移动模式 默认是crop
         aspectRatio: 1, // 纵横比 定义裁剪框的固定长宽比。默认情况下，裁剪框具有空闲比率
         autoCropArea: 1, // 它应该是0到1之间的一个数字。定义自动裁剪面积大小(百分比)。
         cropBoxMovable: false, // 是否允许通过拖动移动裁剪框。
         cropBoxResizable: false, // 是否允许通过拖动调整裁剪框的大小
         background: false, // 是否显示本身的背景样式
         movable: true //  启用移动图像。
})
    },
    methods: {
        onComplete() {
            // 基于服务端的裁切使用 getDate 方法获取裁切参数
            // console.log(this.cropper.getDate())

            // 纯客户端的裁切使用 getCropperCanvas 获取裁切的文件对象
                this.cropper.getCroppedCanvas().toBlob(blob => {
                   console.log(blob)
                   this.onCompletePhoto(blob)
          })
    },
    async onCompletePhoto (blob) {
         this.$toast.loading({
            message: '更改中...',
            duration: 0,
            forbidClick: true
         })
         try {
                     // 错误用法
                     // 如果接口要求content-Type 是Content-Type application/json
                     // 则传递普通 Javascript 对象
                     // updateUserPhoto({
                        // photo:data.data.photo
                     //  })

                    // 如果接口要求 Content-Type 是Content-Type multipart/form-data
                    // 则必须传递 From Date 对象
                    const formData = new FormData()
                    formData.append('photo', blob)

                    // 获取接口数据
                    const { data } = await getUserPhoto(formData)
                    console.log(data)
                    // 关闭弹出层
                    this.$emit('close')
                    // 更新头像视图
                    this.$emit('update-photo', data.data.photo)
                    // 提示更改成功
                    this.$toast.success('更改成功')
                   } catch (err) {
                    this.$toast.fail('修改失败')
                   }
    }
}
}
</script>

<style scoped lang="less">
    .update-photo {
        background-color: #000;
        height: 100%;
       /deep/ .images {
            display: block;
            max-width: 100% !important;
        }
        .editPhoto {
            display: flex;
            justify-content: space-between; // 两边对齐
            align-content: center;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0 15px;
            .cancel,.complete {
                display: flex;
                justify-content: center;
                align-content: center;
                width: 100px;
                height: 70px !important;
                font-size: 35px;
                color: #fff;
            }
        }
    }
</style>