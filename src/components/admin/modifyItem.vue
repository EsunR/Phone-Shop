<template>
  <div id="modifyItem">
    <h1>商品信息</h1>
    <div class="top e_card">
      <div class="img_box">
        <img :src="itemData.cover">
      </div>
      <div class="info_box">
        <div class="title info">{{itemData.title}} [基本信息]</div>
        <hr>
        <div class="sale info">销售量：{{itemData.saleNum}}件</div>
        <div class="stock info">库存: {{itemData.stock}}件</div>

        <div class="color info">
          <div class="label">可选颜色：</div>
          <el-row :gutter="10">
            <el-col :span="12" v-for="(item,index) in itemData.color" :key="index">
              <div class="color_selector">{{item}}</div>
            </el-col>
          </el-row>
        </div>

        <div class="sort info">
          <div class="label">可选配置：</div>
          <el-row :gutter="10">
            <el-col :span="12" v-for="(item,index) in itemData.sort" :key="index">
              <div class="sort_selector">{{item.sort}} {{item.price}}元</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <h1>更改商品信息</h1>

    <itemForm class="itemForm" :itemData="itemData"></itemForm>
    
  </div>
</template>

<script>
import itemForm from "../subComponents/itemForm.vue";
export default {
  data() {
    return {
      itemData: {
        id: "",
        title: "",
        price: "",
        saleNum: "",
        stock: "",
        introduction: "",
        color: [],
        sort: [],
        status: "",
        cover: ""
      }
    };
  },
  components: {
    itemForm
  },
  methods: {
    getItem() {
      this.axios
        .get("/getItem?id=" + this.$route.params.id)
        .then(res => {
          if (res.data.code == 1) {
            this.itemData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getItem();
  }
};
</script>

<style lang='scss' scoped>
.top {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  .img_box {
    width: 460px;
    height: 460px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .info_box {
    position: relative;
    width: 460px;
    padding-left: 20px;
    .title {
      font-size: 24px;
      color: #212121;
    }
    .info {
      margin-bottom: 20px;
    }
    .color {
      .color_selector {
        color: #909399;
        border: 1px solid #dcdfe6;
        padding: 5px 10px;
        box-sizing: border-box;
        margin-top: 10px;
        text-align: center;
      }
    }
    .sort {
      .sort_selector {
        color: #909399;
        border: 1px solid #dcdfe6;
        padding: 5px 10px;
        box-sizing: border-box;
        margin-top: 10px;
        text-align: center;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      width: 450px;
      position: absolute;
      bottom: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
    }
  }
}
.itemForm {
  margin-top: 20px;
}
</style>