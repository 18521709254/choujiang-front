<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item v-if="form.id" label="开始时间：" prop="startDate">
        <el-date-picker
          v-model="form.startDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item v-if="form.id" label="结束时间:" prop="endDate">
        <el-date-picker
          v-model="form.endDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="物业:" prop="propertyId">
        <el-select v-model="form.propertyId" filterable clearable placeholder="请选择物业" @change="listCommunityByPropertyId">
          <el-option
            v-for="item in propertyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="小区:" prop="communityId">
        <el-select v-model="form.communityId" filterable clearable placeholder="请选择小区" @change="listSpaceByCommunityId">
          <el-option
            v-for="item in communityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车位:" prop="parkingSpaceId">
        <el-select v-model="form.parkingSpaceId" filterable clearable placeholder="请选择车位">
          <el-option
            v-for="item in spaceList"
            :key="item.id"
            :label="item.no"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="停车会员:" prop="memberId">
        <el-select v-model="form.memberId" filterable clearable placeholder="请选择会员">
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
      <el-form-item v-if="form.id" label="缴费状态:" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio-button label="0">未交费</el-radio-button>
          <el-radio-button label="1">已交费</el-radio-button>
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
import { saveBill, getBillById } from '@/api/bill'
import { uploadImage } from '@/api/base'
import { listMemberAll } from '@/api/member'
import { listCommunityByPropertyId } from '@/api/community'
import { listPropertyAll } from '@/api/property'
import { listSpaceByCommunityId } from '@/api/space'

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
      // 物业集合
      propertyList: [],
      // 小区集合
      communityList: [],
      // 车位集合
      spaceList: [],
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
    // 查询全部物业
    this.listPropertyAll()
  },
  methods: {
    /**
     * 查询全部物业
     */
    listPropertyAll() {
      listPropertyAll().then((res) => {
        this.propertyList = res.data
      })
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
     * 根据物业查询小区
     */
    listSpaceByCommunityId(communityId) {
      listSpaceByCommunityId(communityId).then((res) => {
        this.spaceList = res.data
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
        saveBill(form).then((res) => {
          const { message } = res
          if (message !== '订单保存成功') {
            this.$message.warning(message)
            return
          }
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

