<template>
  <div id="itemList">
    <div class="e_card" v-if="itemList.length == 0">暂无相关商品</div>
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in itemList" :key="item.id">
        <div class="list shadow_base" @click="itemClick(item)">
          <div class="img_box" :style="`background: url(${item.cover});`"></div>
          <div class="title">
            {{item.title}}
            <span v-if="item.status == 0">已下架</span>
          </div>
          <hr>
          <div class="info_box">
            <div class="sale_num">销售量：{{item.saleNum}}</div>
            <div class="price">售价：￥{{item.price}}元</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-button
      v-if="itemList.length < total"
      style="margin: 0 auto; display: flex; margin-bottom: 50px;"
      icon="el-icon-more-outline"
      type="primary"
      @click="getMore"
      plain
    >获取更多</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "1",
      itemList: [],
      total: 0
    };
  },
  props: ["keyWords", "mod"],
  methods: {
    getItemList() {
      let params = {};
      params.page = this.page;
      if (this.keyWords != "") {
        params.keyWords = this.keyWords;
      }
      this.axios
        .get("/getItemList", { params })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.data.total;
            this.itemList = [...this.itemList, ...res.data.data.itemList];
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getMore() {
      this.page++;
      this.getItemList();
    },
    itemClick(item) {
      if (this.mod == "admin") {
        this.$router.push("/itemManage/modifyItem/" + item.id);
      } else {
        this.$router.push("/item/" + item.id);
      }
    }
  },
  mounted() {
    this.getItemList();
  },
  watch: {
    keyWords: function() {
      this.itemList = [];
      this.page = 1;
      this.getItemList();
    }
  }
};
</script>

<style lang='scss' scoped>
#itemList {
  margin-top: 20px;
  .list {
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;
    margin-bottom: 20px;
    height: 430px;
    &:hover {
      background-color: #409eff;
      color: white !important;
      transition: 0.3s;
      .price {
        color: white !important;
      }
      span {
        background-color: #fff !important;
        color: #909399 !important;
      }
    }
    .img_box {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      background-size: 100% 100% !important;
    }
    .title {
      padding: 0 10px;
      padding-top: 20px;
      text-align: center;
      font-size: 18px;
      span {
        display: inline-block;
        margin: 0 5px;
        padding: 1px 5px;
        position: relative;
        top: -1px;
        background-color: #909399;
        color: white;
        font-size: 14px;
        border-radius: 5px;
      }
    }
    .info_box {
      font-size: 16px;
      padding: 0 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #ff6700;
      }
    }
  }
}
</style>