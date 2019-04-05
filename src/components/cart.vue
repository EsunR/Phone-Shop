<template>
  <div id="cart">
    <h1>
      <i class="el-icon-sold-out"></i> 购物车
    </h1>
    <div class="cart_list">
      <div class="list e_card" v-for="item in cartData" :key="item.id">
        <div class="img_box">
          <img :src="item.cover">
        </div>
        <div class="info_box">
          <div class="title">{{item.title}}</div>
          <hr>
          <div class="bottom">
            <div class="left">
              <div class="color">所选颜色：{{item.color}}</div>
              <div class="sort">所选配置：{{item.sort}}</div>
            </div>
            <div class="right">ss</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: [
        {
          id: "1", // 购物车id
          itemId: "1",
          title: "小米9",
          cover: "https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg",
          count: "1",
          color: "红色",
          sort: "8+128G",
          price: "1000" // 这里的price是商品单价
        },
        {
          id: "2", // 购物车id
          itemId: "1",
          title: "小米9",
          cover: "https://i8.mifile.cn/a1/pms_1550642240.48638886.jpg",
          count: "1",
          color: "红色",
          sort: "8+128G",
          price: "1000" // 这里的price是商品单价
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.list {
  margin: 20px 0;
  display: flex;
  .img_box {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info_box {
    width: 765px;
    padding-left: 20px;
    .title {
      font-size: 24px;
    }
    .bottom{
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>