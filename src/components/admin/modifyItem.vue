<template>
  <div id="modifyItem">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemData: {
        id: 1,
        title: "小米9 青春版",
        price: "1999",
        saleNum: 100,
        stock: 1000,
        introduction: "<p>商品介绍</p>",
        color: ["蓝色", "红色", "黑色"],
        sort: [
          { sort: "6G+128G", price: "1999" },
          { sort: "8G+128G", price: "2399" },
          { sort: "9G+128G", price: "3999" },
          { sort: "12G+128G", price: "4399" }
        ],
        status: 1,
        cover: "https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg"
      }
    };
  }
};
</script>

<style lang='scss' scoped>
.top {
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
</style>