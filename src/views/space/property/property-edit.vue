<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="停车单价/每小时:" prop="price">
        <el-input v-model="form.price" style="width: 500px" />
      </el-form-item>
      <el-form-item label="车位编号:" prop="no">
        <el-input v-model="form.no" style="width: 500px" />
      </el-form-item>
      <el-form-item label="所属小区:" prop="communityId">
        <el-select v-model="form.communityId" filterable clearable placeholder="请选择物业">
          <el-option
            v-for="item in communityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车位类型:">
        <el-radio-group v-model="form.type">
          <el-radio-button label="1">物业</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.id" label="车位使用状态:">
        <el-radio-group v-model="form.useStatus">
          <el-radio-button label="0">暂停使用</el-radio-button>
          <el-radio-button label="1">空闲</el-radio-button>
          <el-radio-button label="2">使用中</el-radio-button>
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
import { saveSpace, getSpaceById } from '@/api/space'
import { listCommunityAll } from '@/api/community'
export default {
  name: 'PropertySpaceEdit',
  data() {
    return {
      // 表单数据
      form: {
        // 车位ID
        id: '',
        // 停车单价/每小时
        price: '',
        // 车位类型：1-物业、2-私人
        type: 1,
        // 车位使用状态：0-暂停租用、1-空闲、2-使用中
        useStatus: 0,
        // 费用占比
        percent: '',
        // 车位编号
        no: '',
        // 审核状态
        checkStatus: 1,
        // 物业ID
        communityId: ''
      },
      // 物业集合
      communityList: [],
      // 表单验证规则
      formRules: {
        price: [
          { required: true, message: '请输入停车单价', trigger: 'blur' }
        ],
        communityId: [
          { required: true, message: '请选择物业', trigger: 'blur' }
        ],
        percent: [
          { required: true, message: '请输入费用占比', trigger: 'blur' }
        ],
        no: [
          { required: true, message: '请输入车位编号', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 查询物业数据
    this.listCommunityAll()
    // 获取父页面传入进来的ID
    const spaceId = this.$route.query.spaceId
    if (spaceId) {
      this.form.id = spaceId
    }
    // 加载表格数据
    this.getSpaceById()
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
        saveSpace(form).then((res) => {
          this.$message.success(res.message)
          // 返回上一级页面
          this.onCancel()
        })
      })
    },
    /**
     * 查询全部物业
     */
    listCommunityAll() {
      listCommunityAll().then((res) => {
        this.communityList = res.data
      })
    },
    /**
     * 取消
     */
    onCancel() {
      this.$router.go(-1)
    },
    /**
     * 根据ID查询车位信息
     */
    getSpaceById() {
      const formId = this.form.id
      if (!formId) {
        return
      }
      getSpaceById(formId).then((res) => {
        const data = res.data
        Object.assign(this.form, data)
      })
    }
  }
}
</script>

<style scoped>
</style>

