<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/userupdate'
// 引入处理相对时间的库
import dayjs from 'dayjs'
export default {
    name: 'upDateBirthday',
     data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
        type: [Object, String, Number],
        required: true
    }
  },
  methods: {
   async onConfirm() {
    this.$toast.loading({
        message: '修改中...',
        duration: 0,
        forbidClick: true // 禁止背景点击
    })
        try {
           const isCurrentDate = dayjs(this.currentDate).format('YYYY-MM-DD') // 转化字符串格式
           await editUserProfile({
                birthday: isCurrentDate
            })
            // 修改编辑页面文本视图
            this.$emit('input', isCurrentDate)
            // 修改成功的提示
            this.$toast.success('修改成功')
            // 修改成功后关闭弹窗
            this.$emit('close')
        } catch (err) {
            this.$toast.fail('修改失败')
        }
    }
  }
}
</script>

<style>

</style>