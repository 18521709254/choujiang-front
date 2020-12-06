<template>
  <div class="app-container">
    <div class="head">
      <el-button type="danger" @click="delBill">删除</el-button>
      <div class="search-box">
        <el-date-picker
          v-model="startDate"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择订单开始时间"
        />
        <el-date-picker
          v-model="endDate"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择订单结束时间"
        />
        <el-button type="warning" @click="listBillByPage">查询</el-button>
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
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          <div>
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        align="center"
        width="50"
      />
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <div>
            <p style="margin: 0px;text-align: center;">
              {{ scope.row.startDate && scope.row.startDate.substring(11,19) }}
            </p>
            <p style="margin: 0px;text-align: center;">
              {{ scope.row.startDate && scope.row.startDate.substring(0,10) }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          <div>
            <p style="margin: 0px;text-align: center;">
              {{ scope.row.endDate && scope.row.endDate.substring(11,19) }}
            </p>
            <p style="margin: 0px;text-align: center;">
              {{ scope.row.endDate && scope.row.endDate.substring(0,10) }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="缴费时间" align="center">
        <template slot-scope="scope">
          <div>
            <p style="margin: 0px;text-align: center;">
              {{ scope.row.payDate && scope.row.payDate.substring(11,19) }}
            </p>
            <p style="margin: 0px;text-align: center;">
              {{ scope.row.payDate && scope.row.payDate.substring(0,10) }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小区名称">
        <template slot-scope="scope">
          <div>
            {{ scope.row.communityName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="停车用户">
        <template slot-scope="scope">
          <div>
            {{ scope.row.memberName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="车牌号">
        <template slot-scope="scope">
          <div>
            {{ scope.row.carNo }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="缴费状态" align="center">
        <template slot-scope="scope">
          <el-tag style="text-align: center" :type="scope.row.status | statusFilter">{{ scope.row.status | statusType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="车位信息">
        <template slot-scope="scope">
          <div>
            {{ scope.row.spaceNo }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单金额">
        <template slot-scope="scope">
          <div>
            ￥:{{ scope.row.totalMoney }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="抽取金额">
        <template slot-scope="scope">
          <div>
            ￥:{{ scope.row.percentMoney }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <div style="display: flex;margin-bottom: 10px;">
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
            </div>
            <div style="display: flex">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-check"
                @click="handleSuccess(scope.$index, scope.row)"
              />
              <el-button
                size="mini"
                type="success"
                icon="el-icon-star-off"
                @click="handlePay(scope.$index, scope.row)"
              />
            </div>
          </div>
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
import { listBillByPage, delBillByIds, closeBillByIds, payBillByIds } from '@/api/bill'
export default {
  name: 'BillList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'gery',
        1: 'success'
      }
      return statusMap[status]
    },
    statusType(status) {
      const statusMap = {
        0: '未交费',
        1: '已交费'
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
      carNo: '',
      // 开始时间
      startDate: '',
      // 结束时间
      endDate: '',
      // 被选中的ID集合
      ids: []
    }
  },
  created() {
    this.listBillByPage()
  },
  methods: {
    /**
     * 数据查询
     */
    listBillByPage() {
      this.listLoading = true
      const { pageInfo, carNo, startDate } = this
      const postData = { pageInfo: pageInfo, carNo: carNo, startDate: startDate }
      listBillByPage(postData).then((res) => {
        const data = res.data
        this.listLoading = false
        this.list = data.list
        this.total = data.total
      })
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
      this.listBillByPage()
    },
    /**
     * 分页跳转
     * @param value 跳转数据
     */
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value
      this.listBillByPage()
    },
    /**
     * 删除按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleDelete(index, row) {
      this.ids = [row.id]
      this.delBill()
    },
    /**
     * 结束订单
     * @param index 行数
     * @param row 选中行数据
     */
    handleSuccess(index, row) {
      this.ids = [row.id]
      this.closeBill()
    },
    /**
     * 订单缴费
     * @param index 行数
     * @param row 选中行数据
     */
    handlePay(index, row) {
      this.ids = [row.id]
      this.payBill()
    },
    /**
     * 编辑按钮
     * @param index 行数
     * @param row 选中行数据
     */
    handleEdit(index, row) {
      this.$router.push({ name: 'BillEdit', query: { billId: row.id }})
    },
    /**
     * 根据订单ID结束订单
     */
    closeBill() {
      const ids = this.ids
      closeBillByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listBillByPage()
      })
    },
    /**
     * 根据订单ID缴费
     */
    payBill() {
      const ids = this.ids
      payBillByIds(ids).then((res) => {
        this.$message.success(res.message)
        this.listBillByPage()
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
