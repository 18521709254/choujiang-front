<template>
  <div class="app-container">
    <div class="head">
      <el-button type="primary" @click="addComplaint">新增</el-button>
      <el-button type="danger" @click="delComplaint">删除</el-button>
      <div class="search-box">
        <el-input maxlength="50" v-model="content" placeholder="请输入投诉内容进行查询" />
        <el-button type="warning" @click="listComplaintByPage">查询</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      stripe
      border
      :data="list"
      element-loading-text="Loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="投诉会员">
        <template slot-scope="scope">
          {{ scope.row.memberName }}
        </template>
      </el-table-column>
      <el-table-column label="投诉物业">
        <template slot-scope="scope">
          {{ scope.row.propertyName }}
        </template>
      </el-table-column>
      <el-table-column label="投诉小区">
        <template slot-scope="scope">
          {{ scope.row.communityName }}
        </template>
      </el-table-column>
      <el-table-column label="投诉内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="投诉状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="display: flex;justify-content: flex-end;margin-top: 10px;"
      background
      :page-size="pageInfo.pageSize"
      :current-page="pageInfo.pageNum"
      :page-sizes="[5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { listComplaintByPage, delComplaintByIds } from '@/api/complaint'
export default {
  name: 'ComplaintList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'gery',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusType(status) {
      const statusMap = {
        0: '未处理',
        1: '已处理'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 展示数据
      list: [{}],
      // 查询状态
      listLoading: true,
      // 分页属性
      pageInfo: {
        pageNum: 1,
        pageSize: 5
      },
      // 总数量
      total: 100,
      // 名称查询
      content: '',
      // 被选中的ID集合
      ids: []
    }
  },
  created() {
    this.listComplaintByPage()
  },
  methods: {
    /**
     * 数据查询
     */
    listComplaintByPage() {
      this.listLoading = true
      const { pageInfo, content } = this
      const postData = { pageInfo: pageInfo, content: content }
      listComplaintByPage(postData).then((res) => {
        const data = res.data
        this.listLoading = false
        this.list = data.list
        this.total = data.total
      })
    },
    /**
     * 新增页面组件
     */
    addComplaint() {
      this.$router.push({ name: 'ComplaintEdit' })
    },
    /**
     * 多选框change事件
     */
    handleSelectionChange(value) {
      this.ids = value.map(item => item.id)
    },
    /**
     * 修改每页显示多少条
     * @param value 跳转数据
     */
    handleSizeChange(value) {
      this.pageInfo.pageSize = value
      this.listComplaintByPage()
    },
    /**
     * 分页跳转
     * @param value 跳转数据
     */
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value
      this.listComplaintByPage()
    },
    /**
     * 删除按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleDelete(index, row) {
      this.ids = [row.id]
      this.delComplaint()
    },
    /**
     * 编辑按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleEdit(index, row) {
      this.$router.push({ name: 'ComplaintEdit', query: { complaintId: row.id }})
    },
    /**
     * 根据公告ID集合删除公告信息
     */
    delComplaint() {
      const ids = this.ids
      delComplaintByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listComplaintByPage()
      })
    }
  }
}
</script>
<style scoped>
.head{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.head>button{
  margin-bottom: 0!important;
}
.search-box{
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
}
.search-box>button{
  margin-left: 10px;
}
</style>
