<template>
  <div class="upDate-Gender">
   <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/userupdate'
export default {
    name: 'upDateGender',
     data() {
    return {
      columns: ['男', '女'],
      locolGender: this.value
    }
  },
  props: {
    value: {
        type: Number,
        required: true
    }
  },
  methods: {
   async onConfirm() {
        this.$toast.loading({
            message: '修改中...',
            forbidClick: true, // 禁止背景触发
            duration: 0 // 显示时间
        })
        try {
            await editUserProfile({
                gender: this.locolGender
            })
            // 修改性别显示视图
            this.$emit('input', this.locolGender)
            // 关闭弹层
            this.$emit('close')
            // 显示成功弹窗
            this.$toast.success('修改成功')
        } catch (err) {
            this.$toast.fail('修改失败')
        }
    },
    onChange(picker, value, index) {
    //   Toast(`当前值：${value}, 当前索引：${index}`);
            this.locolGender = index
    }
  }
}
</script>

<style>

</style>