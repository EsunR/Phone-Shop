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
          <el-input-number v-if="itemData.status == 1" v-model="count" :min="1" :max="10"></el-input-number>

          <div class="btn_box">
            <el-button v-if="itemData.status == 1" icon="el-icon-sold-out" @click="addCart">加入购物车</el-button>
            <el-button
              v-if="itemData.status == 1"
              type="primary"
              icon="el-icon-goods"
              @click="bought"
            >购买</el-button>
          </div>

          <el-button
            v-if="itemData.status == 0"
            icon="el-icon-circle-close"
            type="info"
            disabled
          >商品已下架</el-button>
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

    <div class="select_bar">
      <div
        class="selector"
        :class="{active: active == 'information'}"
        @click="handelSelector('information')"
      >商品详情</div>
      <div
        class="selector"
        :class="{active: active == 'comment'}"
        @click="handelSelector('comment')"
      >商品评论</div>
    </div>
    <div class="view_box">
      <transition>
        <information v-show="active == 'information'" :introduction="itemData.introduction"></information>
      </transition>
      <transition>
        <comment v-show="active == 'comment'" :itemId="$route.params.id"></comment>
      </transition>
    </div>
  </div>
</template>

<script>
import information from "./subComponents/information.vue";
import comment from "./subComponents/comment.vue";
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
      },
      active: "information"
    };
  },
  components: {
    information,
    comment
  },
  methods: {
    handelSelector(opration) {
      this.active = opration;
    },
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
      this.axios
        .post("/addCart", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("加入购物车成功");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
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
      font-size: 14px;
    }
    .price {
      font-size: 18px;
      color: #ff6700;
    }
  }
}

.select_bar {
  margin: 20px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  display: flex;
  overflow: hidden;
  .selector {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
  }
  .active {
    background-color: #409eff;
    color: white;
  }
}
</style>