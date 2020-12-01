<template>
  <div class="app-container">
    <div class="head">
      <el-button type="primary" @click="addPlacard">新增</el-button>
      <el-button type="danger" @click="delPlacard">删除</el-button>
      <div class="search-box">
        <el-input maxlength="50" v-model="title" placeholder="请输入标题进行查询" />
        <el-button type="warning" @click="listPlacardByPage">查询</el-button>
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
      <el-table-column label="公告标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
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
import { listPlacardByPage, delPlacardByIds } from '@/api/placard'
export default {
  name: 'PlacardList',
  filters: {
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
      title: '',
      // 被选中的ID集合
      ids: []
    }
  },
  created() {
    this.listPlacardByPage()
  },
  methods: {
    /**
     * 数据查询
     */
    listPlacardByPage() {
      this.listLoading = true
      const { pageInfo, title } = this
      const postData = { pageInfo: pageInfo, title: title }
      listPlacardByPage(postData).then((res) => {
        const data = res.data
        this.listLoading = false
        this.list = data.list
        this.total = data.total
      })
    },
    /**
     * 新增页面组件
     */
    addPlacard() {
      this.$router.push({ name: 'PlacardEdit' })
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
      this.listPlacardByPage()
    },
    /**
     * 分页跳转
     * @param value 跳转数据
     */
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value
      this.listPlacardByPage()
    },
    /**
     * 删除按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleDelete(index, row) {
      this.ids = [row.id]
      this.delPlacard()
    },
    /**
     * 编辑按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleEdit(index, row) {
      this.$router.push({ name: 'PlacardEdit', query: { placardId: row.id }})
    },
    /**
     * 根据物业ID集合删除物业信息
     */
    delPlacard() {
      const ids = this.ids
      delPlacardByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listPlacardByPage()
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
