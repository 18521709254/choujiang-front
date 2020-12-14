<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="物业名称:" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="平台占比:" prop="platformPercent">
        <el-input v-model="form.platformPercent" style="width: 500px" />
      </el-form-item>
      <el-form-item label="物业占比:" prop="propertyPercent">
        <el-input v-model="form.propertyPercent" style="width: 500px" />
      </el-form-item>
      <el-form-item label="会员占比:" prop="memberPercent">
        <el-input v-model="form.memberPercent" style="width: 500px" />
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
  name: 'TariffEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 物业ID
        id: '',
        // 物业名称
        name: '',
        // 资质图片
        path: '',
        // 平台占比
        platformPercent: '',
        // 物业占比
        propertyPercent: '',
        // 会员占比
        memberPercent: '',
        status: 0
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

