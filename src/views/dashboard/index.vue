<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎: {{ userInfo.name }}</div>
    <div class="dashboard-text">角色: {{ userInfo.roleName }}</div>
    <div class="info-box">
      <div class="info-item" v-for="(item,index) in userInfo.placardList" :key="index">
        <h4>{{item.title}}</h4>
        <span>{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'userInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  .info-box{
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ddd;
    margin-top: 20px;
    .info-item{
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
      &:last-child{
        border: none;
      }
    }
  }
</style>
