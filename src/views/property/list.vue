<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom:30px;" @click="addProperty">新增</el-button>
    <el-button type="primary" style="margin-bottom:30px;">删除</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column label="物业名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="审核状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="50"
    />
  </div>
</template>

<script>
import { listPropertyByPage } from '@/api/property'
import { getRandomValue } from '@/utils/index'
export default {
  name: 'PropertyList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'gray',
        3: 'danger'
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
        pageSize: 20
      },
      // 名称查询
      name: ''
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
        this.listLoading = false
        this.list = res.data.list
      })
    },
    /**
     * 新增页面组件
     */
    addProperty() {
      this.$router.push({ name: 'PropertyAdd', query: { r: getRandomValue() }})
    }
  }
}
</script>
