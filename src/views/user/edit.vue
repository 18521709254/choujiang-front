<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="用户名称：" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="用户账号:" prop="account">
        <el-input v-model="form.account" style="width: 500px" />
      </el-form-item>
      <el-form-item label="账号密码:" prop="password">
        <el-input v-model="form.password" show-password style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系方式:" prop="tel">
        <el-input v-model="form.tel" style="width: 500px" />
      </el-form-item>
      <el-form-item label="角色:" prop="roleId">
        <el-select v-model="form.roleId" filterable clearable placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 70%;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveUser, getUserById } from '@/api/user'
import { listRoleAll } from '@/api/role'

export default {
  name: 'UserEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 用户ID
        id: '',
        // 用户名称
        name: '',
        // 用户账号
        account: '',
        // 密码
        password: '',
        // 角色ID
        roleId: '',
        // 联系方式
        tel: '',
      },
      // 角色管理
      roleList: [],
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输用户名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 获取父页面传入进来的ID
    const userId = this.$route.query.userId
    if (userId) {
      this.form.id = userId
    }
    // 加载表格数据
    this.getUserById()
    // 查询全部角色
    this.listRoleAll()
  },
  methods: {
    /**
     * 插叙全部橘色
     */
    listRoleAll() {
      listRoleAll().then((res) => {
        this.roleList = res.data
      })
    },
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
        saveUser(form).then((res) => {
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
     * 根据ID查询用户信息
     */
    getUserById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getUserById(formId).then((res) => {
        const data = res.data
        Object.assign(this.form, data)
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

