<template>
  <div id="home">
    <div class="e_card head">
      <h1><i class="el-icon-star-off"></i> 最新资讯</h1>
      <hr>
      <el-carousel indicator-position="outside" height="400px">
        <el-carousel-item v-for="item in news" :key="item.id">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="search_bar e_card">
      <h1><i class="el-icon-search"></i> 商品搜索</h1>
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
      searchKeyWords: "",
      news: [
        {
          id: 1,
          url:
            "http://study.esunr.xyz/%E6%9C%AA%E6%A0%87%E9%A2%98-1.jpg"
        },
        {
          id: 2,
          url:
            "http://study.esunr.xyz/1.jpg"
        },
        {
          id: 3,
          url:
            "https://res.samsungeshop.com.cn/resources/pdp/products/SM-G8870Pink/SM-G8870/add-3-pc.jpg"
        },
        {
          id: 4,
          url:
            "https://www.aptg.com.tw/export/sites/aptg/event/images/019/xiaomi9_pcm.jpg"
        }
      ]
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
.head {
  margin-bottom: 20px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.search_bar {
  .input-with-select {
    margin-top: 20px;
  }
}
</style>

