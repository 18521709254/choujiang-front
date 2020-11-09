<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="物业名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveProperty, getPropertyById } from '@/api/property'
export default {
  name: 'PropertyEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 物业ID
        id: '',
        // 物业名称
        name: ''
      },
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输物业名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 加载表格数据
    this.getPropertyById()
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
        saveProperty(form).then((res) => {
          this.$message.success(res.data)
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
     * 根据ID查询物业信息
     */
    getPropertyById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getPropertyById(formId).then((res) => {
        console.log('测试')
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

