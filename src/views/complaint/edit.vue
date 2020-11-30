<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="投诉物业:" prop="propertyId">
        <el-select v-model="form.propertyId" filterable clearable placeholder="请选择物业" @change="listCommunityByPropertyId">
          <el-option
            v-for="item in propertyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投诉小区:" prop="communityId">
        <el-select v-model="form.communityId" filterable clearable placeholder="请选择小区">
          <el-option
            v-for="item in communityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投诉会员:" prop="memberId">
        <el-select v-model="form.memberId" filterable clearable placeholder="请选择会员">
          <el-option
            v-for="item in memberList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="投诉内容：" prop="content">
        <el-input v-model="form.content" style="width: 500px" />
      </el-form-item>
      <el-form-item v-if="form.id" label="回复内容:" prop="replyContent">
        <el-input v-model="form.replyContent" style="width: 500px" />
      </el-form-item>
      <el-form-item style="margin-left: 70%;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveComplaint, getComplaintById, uploadImage } from '@/api/complaint'
import { listPropertyAll } from '@/api/property'
import { listCommunityByPropertyId } from '@/api/community'
import { listMemberAll } from '@/api/member'
export default {
  name: 'ComplaintEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 投诉ID
        id: '',
        // 会员D
        memberId: '',
        // 小区ID
        communityId: '',
        // 物业ID
        propertyId: '',
        // 内容
        content: '',
        // 审核状态
        status: '',
        // 回复内容
        replyContent: ''
      },
      // 物业集合
      propertyList: [],
      // 小区集合
      communityList: [],
      // 会员集合
      memberList: [],
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输投诉名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输投诉地址', trigger: 'blur' }
        ],
        propertyId: [
          { required: true, message: '请选择物业', trigger: 'blur' }
        ]
        // path: [
        //   { required: true, message: '请上传投诉平面图', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    // 查询物业数据
    this.listPropertyAll()
    // 获取父页面传入进来的ID
    const complaintId = this.$route.query.complaintId
    if (complaintId) {
      this.form.id = complaintId
    }
    // 加载表格数据
    this.getComplaintById()
    // 查询全部会员
    this.listMemberAll()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    /**
     * 根据物业查询小区
     */
    listCommunityByPropertyId(propertyId) {
      listCommunityByPropertyId(propertyId).then((res) => {
        this.communityList = res.data
      })
    },
    /**
     * 查询全部物业
     */
    listMemberAll() {
      listMemberAll().then((res) => {
        this.memberList = res.data
      })
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
        saveComplaint(form).then((res) => {
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
     * 根据ID查询投诉信息
     */
    getComplaintById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getComplaintById(formId).then((res) => {
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

