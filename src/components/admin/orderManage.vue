<template>
  <div id="orderManage">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">全部订单</el-menu-item>
      <el-menu-item index="1">待发货订单</el-menu-item>
      <el-menu-item index="4">申请退货订单</el-menu-item>
    </el-menu>
    <orderList :status="status"></orderList>
  </div>
</template>

<script>
import orderList from "../subComponents/orderList.vue";
export default {
  data() {
    return {
      activeIndex: "0",
      status: "0"
    };
  },
  components: {
    orderList
  },
  methods: {
    handleSelect(index) {
      this.status = index;
    }
  }
};
</script>

<style lang='scss' scoped>
.el-menu {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 0 20px;
}
</style>