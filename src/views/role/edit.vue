<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="角色名称:" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item style="margin-left: 70%;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveRole, getRoleById } from '@/api/role'
export default {
  name: 'RoleEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 橘色ID
        id: '',
        // 橘色名称
        name: '',
      },
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输橘色名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 获取父页面传入进来的ID
    const roleId = this.$route.query.roleId
    if (roleId) {
      this.form.id = roleId
    }
    // 加载表格数据
    this.getRoleById()
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
        saveRole(form).then((res) => {
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
     * 根据ID查询橘色信息
     */
    getRoleById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getRoleById(formId).then((res) => {
        const data = res.data
        Object.assign(this.form, data)
      })
    }
  }
}
</script>

<style scoped>
</style>

