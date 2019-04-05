<template>
  <div id="home">
    <div class="search_bar e_card">
      <h1>商品搜索</h1>
      <el-input placeholder="请输入内容" v-model="keyWords" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <itemList :keyWords="searchKeyWords"></itemList>
  </div>
</template>

<script>
import itemList from "./subComponents/itemList.vue";

export default {
  data() {
    return {
      keyWords: "",
      searchKeyWords: ""
    };
  },
  components: {
    itemList
  },
  methods: {
    search() {
      this.searchKeyWords = this.keyWords;
    }
  }
};
</script>

<style lang='scss' scoped>
.search_bar {
  .input-with-select {
    margin-top: 20px;
  }
}
</style>

