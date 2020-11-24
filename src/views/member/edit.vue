<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="会员名称：" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="会员账号:" prop="account">
        <el-input v-model="form.account" style="width: 500px" />
      </el-form-item>
      <el-form-item label="账号密码:" prop="password">
        <el-input v-model="form.password" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系方式:" prop="tel">
        <el-input v-model="form.tel" style="width: 500px" />
      </el-form-item>
      <el-form-item label="sex" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio-button label="1">男</el-radio-button>
          <el-radio-button label="0">女</el-radio-button>
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
import { saveMember, getMemberById } from '@/api/member'
export default {
  name: 'MemberEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 会员ID
        id: '',
        // 会员名称
        name: '',
        // 会员账号
        account: '',
        // 联系方式
        tel: '',
        // 性别
        sex: ''
      },
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输会员名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 获取父页面传入进来的ID
    const memberId = this.$route.query.memberId
    if (memberId) {
      this.form.id = memberId
    }
    // 加载表格数据
    this.getMemberById()
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
        saveMember(form).then((res) => {
          this.$message.success(res.message)
          // 返回上一级页面
          this.onCancel()
        })
      })
    },
    /**
     * 查询全部物业
     */
    listPropertyAll() {
      listPropertyAll().then((res) => {
        this.propertyList = res.data
      })
    },
    /**
     * 取消
     */
    onCancel() {
      this.$router.go(-1)
    },
    /**
     * 根据ID查询会员信息
     */
    getMemberById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getMemberById(formId).then((res) => {
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

