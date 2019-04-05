<template>
  <div id="item">
    <div class="top e_card">
      <div class="img_box">
        <img :src="itemData.cover">
      </div>
      <div class="info_box">
        <div class="title info">{{itemData.title}}</div>
        <hr>
        <div class="sale info">销售量：{{itemData.saleNum}}件</div>
        <div class="stock info">库存: {{itemData.stock}}件</div>

        <div class="color info">
          <div class="label">可选颜色：</div>
          <el-row :gutter="10">
            <el-col :span="12" v-for="(item,index) in itemData.color" :key="index">
              <div
                class="color_selector"
                :class="{active: index == colorIndex}"
                @click="selectColor(index)"
              >{{item}}</div>
            </el-col>
          </el-row>
        </div>

        <div class="sort info">
          <div class="label">可选配置：</div>
          <el-row :gutter="10">
            <el-col :span="12" v-for="(item,index) in itemData.sort" :key="index">
              <div
                class="sort_selector"
                :class="{active: index == sortIndex}"
                @click="selectSort(index)"
              >{{item.sort}} {{item.price}}元</div>
            </el-col>
          </el-row>
        </div>

        <div class="bottom">
          <el-input-number v-model="count" :min="1" :max="10" label="描述文字"></el-input-number>
          <div class="btn_box">
            <el-button icon="el-icon-sold-out" @click="addCart">加入购物车</el-button>
            <el-button type="primary" icon="el-icon-goods" @click="bought">购买</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="article"></div>

    <el-dialog title="请确认订单" :visible.sync="dialogVisible" width="50%">
      <div class="body">
        <div class="item">购买颜色：{{order.color}}</div>
        <div class="item">购买配置：{{order.sort}}</div>
        <div class="item">购买数量：{{order.count}}</div>
        <div class="item">收货地址：{{order.receive}}</div>
        <hr>
        <div class="price">总价：{{order.price}} 元</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createOrder">确 定</el-button>
      </span>
    </el-dialog>
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
      },
      colorIndex: 0,
      sortIndex: 0,
      count: 1,
      dialogVisible: false,
      order: {
        color: "",
        sort: "",
        price: "",
        count: ""
      }
    };
  },
  methods: {
    selectColor(index) {
      this.colorIndex = index;
    },
    selectSort(index) {
      this.sortIndex = index;
    },
    addCart() {
      let obj = {
        itemId: this.itemData.id.toString(),
        color: this.itemData.color[this.colorIndex],
        sort: this.itemData.sort[this.sortIndex].sort,
        price: this.itemData.sort[this.sortIndex].price.toString(),
        time: Date.parse(new Date()).toString(),
        count: this.count.toString()
      };
      // TODO: 加入购物车
      this.axios
        .post('/addCart', obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success('加入购物车成功');
          }
      })
      .catch(err => {
        console.log(err);
        this.$message('服务器无法连接');
      });
    },
    bought() {
      if (this.$store.state.receive == "") {
        this.$message.error("您没有收货地址，请到个人信息中补全收货地址");
        return;
      }
      let obj = {
        itemId: this.itemData.id.toString(),
        color: this.itemData.color[this.colorIndex],
        sort: this.itemData.sort[this.sortIndex].sort,
        price: (
          this.itemData.sort[this.sortIndex].price * this.count
        ).toString(),
        time: Date.parse(new Date()).toString(),
        count: this.count.toString(),
        receive: this.$store.state.receive
      };
      this.order = obj;
      this.dialogVisible = true;
    },
    createOrder() {
      if (Number(this.order.price) > Number(this.$store.state.money)) {
        this.$message.error("您的账户余额不足，结算失败");
        return;
      } else {
        // TODO: 购买商品
        this.axios
          .post("/createOrder", this.order)
          .then(res => {
            if (res.data.code == 1) {
              this.dialogVisible = false;
              this.$message.success("购买成功！");
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("服务器无法连接");
          });
      }
    },
    getItem() {
      // TODO: 获取商品详情
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
    padding-bottom: 100px;
    .title {
      font-size: 24px;
      color: #212121;
    }
    .info {
      margin-bottom: 20px;
    }
    .active {
      color: #ff6700 !important;
      border: 1px solid #ff6700 !important;
    }
    .color {
      .color_selector {
        color: #909399;
        border: 1px solid #dcdfe6;
        padding: 5px 10px;
        cursor: pointer;
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
        cursor: pointer;
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

.el-dialog {
  .body {
    .item {
      margin-bottom: 10px;
      font-size: 16px;
    }
    .price {
      font-size: 20px;
      color: #ff6700;
    }
  }
}
</style>