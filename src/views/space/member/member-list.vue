<template>
  <div class="app-container">
    <div class="head">
      <el-button type="primary" @click="addMemberSpace">新增</el-button>
      <el-button type="danger" @click="delMemberSpace">删除</el-button>
      <div class="search-box">
        <el-input v-model="no" maxlength="50" placeholder="请输入车位编号进行查询" />
        <el-button type="warning" @click="listMemberSpaceByPage">查询</el-button>
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
      <el-table-column label="所属小区">
        <template slot-scope="scope">
          {{ scope.row.communityName }}
        </template>
      </el-table-column>
      <el-table-column label="车位编号">
        <template slot-scope="scope">
          {{ scope.row.no }}
        </template>
      </el-table-column>
      <el-table-column label="单价/每小时">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="审核状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.checkStatus | statusFilter">{{ scope.row.checkStatus | statusType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="车位类型" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | statusFilter">{{ scope.row.type | statusCheckType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="使用状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.useStatus | statusFilter">{{ scope.row.useStatus | statusUserType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
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
import { listSpaceByPage, delSpaceByIds } from '@/api/space'
export default {
  name: 'MemberSpaceList',
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
    },
    statusCheckType(status) {
      const statusMap = {
        1: '物业',
        2: '私人'
      }
      return statusMap[status]
    },
    statusUserType(status) {
      const statusMap = {
        0: '暂停租用',
        1: '空闲',
        2: '使用中'
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
      no: '',
      // 默认查询私人
      type: 2,
      // 被选中的ID集合
      ids: []
    }
  },
  created() {
    this.listMemberSpaceByPage()
  },
  methods: {
    /**
     * 数据查询
     */
    listMemberSpaceByPage() {
      this.listLoading = true
      const { pageInfo, no, type } = this
      const postData = { pageInfo: pageInfo, no: no, type: type }
      listSpaceByPage(postData).then((res) => {
        const data = res.data
        this.listLoading = false
        this.list = data.list
        this.total = data.total
      })
    },
    /**
     * 新增页面组件
     */
    addMemberSpace() {
      this.$router.push({ name: 'MemberSpaceEdit' })
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
      this.listMemberSpaceByPage()
    },
    /**
     * 分页跳转
     * @param value 跳转数据
     */
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value
      this.listMemberSpaceByPage()
    },
    /**
     * 删除按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleDelete(index, row) {
      this.ids = [row.id]
      this.delMemberSpace()
    },
    /**
     * 编辑按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleEdit(index, row) {
      this.$router.push({ name: 'MemberSpaceEdit', query: { spaceId: row.id }})
    },
    /**
     * 根据车位ID集合删除车位信息
     */
    delMemberSpace() {
      const ids = this.ids
      delSpaceByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listMemberSpaceByPage()
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
