<template>
  <div class="app-container">
    <div class="head">
      <div class="search-box">
        <el-input v-model="name" placeholder="请输入名称进行查询" />
        <el-button type="warning" @click="listPropertyByPage">查询</el-button>
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
      <el-table-column label="物业名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="right" label="平台占比">
        <template slot-scope="scope">
          {{ scope.row.platformPercent }}
        </template>
      </el-table-column>
      <el-table-column align="right" label="物业占比">
        <template slot-scope="scope">
          {{ scope.row.propertyPercent }}
        </template>
      </el-table-column>
      <el-table-column align="right" label="会员占比">
        <template slot-scope="scope">
          {{ scope.row.memberPercent }}
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
import { listPropertyByPage, delPropertyByIds } from '@/api/property'
export default {
  name: 'TariffList',
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
        0: '正在审核',
        1: '审核通过',
        2: '审核失败'
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
    this.listPropertyByPage()
  },
  methods: {
    /**
     * 数据查询
     */
    listPropertyByPage() {
      this.listLoading = true
      const { pageInfo, name } = this
      const postData = { pageInfo: pageInfo, name: name }
      listPropertyByPage(postData).then((res) => {
        const data = res.data
        this.listLoading = false
        this.list = data.list
        this.total = data.total
      })
    },
    /**
     * 新增页面组件
     */
    addProperty() {
      this.$router.push({ name: 'PropertyEdit' })
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
      this.listPropertyByPage()
    },
    /**
     * 分页跳转
     * @param value 跳转数据
     */
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value
      this.listPropertyByPage()
    },
    /**
     * 删除按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleDelete(index, row) {
      this.ids = [row.id]
      this.delProperty()
    },
    /**
     * 编辑按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleEdit(index, row) {
      this.$router.push({ name: 'PropertyEdit', query: { propertyId: row.id }})
    },
    /**
     * 根据物业ID集合删除物业信息
     */
    delProperty() {
      const ids = this.ids
      delPropertyByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listPropertyByPage()
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
