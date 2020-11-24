<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="物业名称:" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="审核状态:" v-if="form.id">
        <el-radio-group  v-model="form.status">
          <el-radio-button label="0">正在审核</el-radio-button>
          <el-radio-button label="1">审核通过</el-radio-button>
          <el-radio-button label="2">审核失败</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="margin-left: 70%;">
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
        name: '',
        // 审核状态
        status: ''
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
    // 获取父页面传入进来的ID
    const propertyId = this.$route.query.propertyId
    if (propertyId) {
      this.form.id = propertyId
    }
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
        // 调用保存方法
        saveProperty(form).then((res) => {
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
     * 根据ID查询物业信息
     */
    getPropertyById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getPropertyById(formId).then((res) => {
        const data = res.data
        Object.assign(this.form, data)
      })
    }
  }
}
</script>

<style scoped>
</style>

