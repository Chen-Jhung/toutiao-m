<template>
  <div class="update-name">
     <van-nav-bar
      title="更换名称"
      left-text="返回"
      right-text="完成"
      class="berColorText"
      @click-left="$emit('close')"
      @click-right="onEditInformation"
    />
    <div class="NameBox">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入要修改的名称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/userupdate'
export default {
  name: 'upDateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value // 输入框文本
    }
  },
  methods: {
   async onEditInformation() {
    // 提示框
    this.$toast.loading({
      message: '更改中...', // 文本
      forbidClick: true, // 禁止背景点击
      duration: 0 // 弹出时间
    })
      try {
        const isLoadName = this.value
        if (!isLoadName.length) { // 是指如果输入的文本长度为0的话 则执行if的代码
        this.$toast('名称修改不能为空')
        return
        }
          await editUserProfile({
          name: this.message
        })
        console.log(isLoadName)
        // 更换编辑资料的视图效果
        this.$emit('input', this.message)
        // 更换之后关闭编辑页面
        this.$emit('close')
        // 提示更改成功
        this.$toast.success('更换成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name {
 /deep/ .berColorText {
    .van-icon-arrow-left,.van-nav-bar__text,.van-nav-bar__text {
      color: #111 !important;
    }
  }
  .NameBox {
    padding: 20px;
  }
}
</style>