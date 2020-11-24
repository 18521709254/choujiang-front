<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="小区名称：" prop="name">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="小区地址:" prop="address">
        <el-input v-model="form.address" style="width: 500px" />
      </el-form-item>
      <el-form-item label="车位平面图:" prop="path">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.path" :src="form.path" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="所属物业:" prop="propertyId">
        <el-select v-model="form.propertyId" filterable clearable placeholder="请选择物业">
          <el-option
            v-for="item in propertyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.id" label="审核状态:">
        <el-radio-group v-model="form.status">
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
import { saveCommunity, getCommunityById, uploadImage } from '@/api/community'
import { listPropertyAll } from '@/api/property'
export default {
  name: 'CommunityEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 小区ID
        id: '',
        // 小区名称
        name: '',
        // 审核状态
        status: '',
        // 物业ID
        propertyId: '',
        // 地址
        address: '',
        // 车位平面图路径
        path: ''
      },
      // 物业集合
      propertyList: [],
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输小区名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输小区地址', trigger: 'blur' }
        ],
        propertyId: [
          { required: true, message: '请选择物业', trigger: 'blur' }
        ]
        // path: [
        //   { required: true, message: '请上传小区平面图', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    // 查询物业数据
    this.listPropertyAll()
    // 获取父页面传入进来的ID
    const communityId = this.$route.query.communityId
    if (communityId) {
      this.form.id = communityId
    }
    // 加载表格数据
    this.getCommunityById()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    /**
     * 上传图片方法
     */
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      // 上传图片
      uploadImage(file).then((res) => {
        this.form.path = res.data.filePath
      })
      return true
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
        saveCommunity(form).then((res) => {
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
     * 根据ID查询小区信息
     */
    getCommunityById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getCommunityById(formId).then((res) => {
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

