<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="公告标题:" prop="title">
        <el-input v-model="form.title" style="width: 500px" />
      </el-form-item>
      <el-form-item label="公告内容:" prop="content">
        <el-input type="textarea" v-model="form.content" style="width: 500px" />
      </el-form-item>
      <el-form-item style="margin-left: 70%;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { savePlacard, getPlacardById } from '@/api/placard'
export default {
  name: 'PlacardEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 公告ID
        id: '',
        // 标题
        title: '',
        // 内容
        content: ''
      },
      // 表单验证规则
      formRules: {
        title: [
          { required: true, message: '请输公告标题', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 获取父页面传入进来的ID
    const placardId = this.$route.query.placardId
    if (placardId) {
      this.form.id = placardId
    }
    // 加载表格数据
    this.getPlacardById()
  },
  methods: {
    /**
     * 数据保存
     */
    onSubmit() {
      const { form } = this
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return
        }
        // 调用保存方法
        savePlacard(form).then((res) => {
          this.$message.success(res.message)
          // 返回上一级页面
          this.onCancel()
        })
      })
    },
    /**
     * 取消
     */
    onCancel() {
      this.$router.go(-1)
    },
    /**
     * 根据ID查询公告信息
     */
    getPlacardById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getPlacardById(formId).then((res) => {
        const data = res.data
        Object.assign(this.form, data)
      })
    }
  }
}
</script>

<style scoped>
</style>

