<template>
  <div class="app-container">
    <div class="head">
      <el-button type="primary" @click="addUser">新增</el-button>
      <el-button type="danger" @click="delUser">删除</el-button>
      <div class="search-box">
        <el-input v-model="name" maxlength="50" placeholder="请输入名称进行查询" />
        <el-button type="warning" @click="listUserByPage">查询</el-button>
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
      <el-table-column label="用户名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="用户账号">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          />
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
import { listUserByPage, delUserByIds } from '@/api/user'
export default {
  name: 'UserList',
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
        0: '女',
        1: '男'
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
      name: '',
      // 被选中的ID集合
      ids: []
    }
  },
  created() {
    this.listUserByPage()
  },
  methods: {
    /**
     * 数据查询
     */
    listUserByPage() {
      this.listLoading = true
      const { pageInfo, name } = this
      const postData = { pageInfo: pageInfo, name: name }
      listUserByPage(postData).then((res) => {
        const data = res.data
        this.listLoading = false
        this.list = data.list
        this.total = data.total
      })
    },
    /**
     * 新增页面组件
     */
    addUser() {
      this.$router.push({ name: 'UserEdit' })
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
      this.listUserByPage()
    },
    /**
     * 分页跳转
     * @param value 跳转数据
     */
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value
      this.listUserByPage()
    },
    /**
     * 删除按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleDelete(index, row) {
      this.ids = [row.id]
      this.delUser()
    },
    /**
     * 编辑按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleEdit(index, row) {
      this.$router.push({ name: 'UserEdit', query: { userId: row.id }})
    },
    /**
     * 根据用户ID集合删除用户信息
     */
    delUser() {
      const ids = this.ids
      delUserByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listUserByPage()
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
