<template>
  <div id="cart">
    <h1>
      <i class="el-icon-sold-out"></i> 购物车
    </h1>
    <div class="cart_list">
      <div class="list e_card" v-for="item in cartList" :key="item.id">
        <div class="img_box">
          <img :src="item.cover">
        </div>
        <div class="info_box">
          <div class="title" @click="$router.push('/item/'+item.itemId)">{{item.title}}</div>
          <hr>
          <div class="bottom">
            <div class="left">
              <div class="price">商品单价：{{item.price}}元</div>
              <div class="color">所选颜色：{{item.color}}</div>
              <div class="sort">所选配置：{{item.sort}}</div>
            </div>
            <div class="right">
              <el-input-number v-model="item.count" :min="1"></el-input-number>
              <el-button @click="deleteCart(item.id)">删除</el-button>
              <el-button type="primary" @click="bought(item)">购买</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      cartList: [
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
      ],
      order: {
        color: "",
        sort: "",
        price: "",
        count: ""
      },
      dialogVisible: false,
      selected: ""
    };
  },
  methods: {
    getCartList() {
      // TODO: 获取购物车列表
      this.axios
        .get("/getCartList")
        .then(res => {
          if (res.data.code == 1) {
            this.cartList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    bought(item) {
      if (this.$store.state.receive == "") {
        this.$message.error("您没有收货地址，请到个人信息中补全收货地址");
        return;
      }
      let obj = {
        itemId: item.itemId.toString(),
        color: item.color,
        sort: item.sort,
        price: (item.price * item.count).toString(),
        time: Date.parse(new Date()).toString(),
        count: item.count.toString(),
        receive: this.$store.state.receive
      };
      this.order = obj;
      this.selected = item.id;
      this.dialogVisible = true;
    },
    deleteCart(id) {
      this.$confirm("您确定要将该商品从购物车删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // TODO: 删除购物车
          this.axios
            .get("/deleteCart?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("删除成功");
                this.getCartList();
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
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
              this.deleteCart(this.selected);
              this.$message.success("购买成功！");
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("服务器无法连接");
          });
      }
    }
  },
  created() {
    this.getCartList();
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
    position: relative;
    .title {
      font-size: 24px;
      display: inline;
      &:hover {
        color: #ff6700;
        cursor: pointer;
      }
    }
    .bottom {
      position: absolute;
      width: 753px;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .left {
        line-height: 1.7;
        font-size: 14px;
        .price {
          color: #ff6700;
          font-size: 16px;
        }
      }
      .right {
        .el-input-number {
          margin-right: 20px;
          width: 150px;
        }
      }
    }
  }
}

.el-dialog {
  .body {
    .item {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .price {
      font-size: 18px;
      color: #ff6700;
    }
  }
}
</style>