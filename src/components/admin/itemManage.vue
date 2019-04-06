<template>
  <div id="itemManage">
    <div class="top">
      <h1><i class="el-icon-setting"></i> 商品管理</h1>
      <el-button type="primary" @click="$router.push('/itemManage/addItem')">添加商品</el-button>
    </div>
    <itemList :mod="'admin'"></itemList>
  </div>
</template>

<script>
import itemList from "../subComponents/itemList.vue";
export default {
  data() {
    return {

    };
  },
  components: {
    itemList
  }
};
</script>

<style lang='scss' scoped>
.top{
  display: flex;
  justify-content: space-between;
}
</style>