<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="开始时间：" prop="startDate">
        <el-date-picker
          v-model="form.startDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="结束时间:" prop="endDate">
        <el-date-picker
          v-model="form.endDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="停车会员:" prop="memberId">
        <el-select v-model="form.memberId" filterable clearable placeholder="请选择物业">
          <el-option
            v-for="item in memberList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车牌号:" prop="carNo">
        <el-input v-model="form.carNo" style="width: 500px" />
      </el-form-item>
      <el-form-item label="缴费状态:" prop="status">
        <el-input v-model="form.status" style="width: 500px" />
      </el-form-item>
      <el-form-item label="车位:" prop="parkingSpaceId">
        <el-input v-model="form.parkingSpaceId" style="width: 500px" />
      </el-form-item>
      <el-form-item style="margin-left: 70%;">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveBill, getBillById, uploadImage } from '@/api/bill'
import { listMemberAll } from '@/api/member'
export default {
  name: 'BillEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 订单ID
        id: '',
        // 开始时间
        startDate: '',
        // 结束时间
        endDate: '',
        // 会员ID
        memberId: '',
        // 车牌号
        carNo: '',
        // 状态
        status: '',
        // 车位ID
        parkingSpaceId: ''
      },
      // 会员集合
      memberList: [],
      // 表单验证规则
      formRules: {
        name: [
          { required: true, message: '请输订单名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输订单地址', trigger: 'blur' }
        ],
        propertyId: [
          { required: true, message: '请选择物业', trigger: 'blur' }
        ]
        // path: [
        //   { required: true, message: '请上传订单平面图', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    // 查询物业数据
    this.listMemberAll()
    // 获取父页面传入进来的ID
    const billId = this.$route.query.billId
    if (billId) {
      this.form.id = billId
    }
    // 加载表格数据
    this.getBillById()
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
        saveBill(form).then((res) => {
          this.$message.success(res.message)
          // 返回上一级页面
          this.onCancel()
        })
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
     * 取消
     */
    onCancel() {
      this.$router.go(-1)
    },
    /**
     * 根据ID查询订单信息
     */
    getBillById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getBillById(formId).then((res) => {
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

