<template>
  <div id="order">
    <h1>
      <i class="el-icon-goods"></i> 已购买的商品
    </h1>
    <div class="order_list">
      <div class="e_card" v-if="orderList.length == 0" style="margin-top: 20px;">暂无商品</div>
      <div class="list e_card" v-for="item in orderList" :key="item.id">
        <div class="img_box">
          <img :src="item.cover">
        </div>
        <div class="info_box">
          <div class="title" @click="$router.push('/item/'+item.itemId)">
            {{item.title}}
            <span>{{item.status | orderStatus}}</span>
          </div>
          <hr>
          <div class="bottom">
            <div class="left">
              <div class="price">订单总价：{{item.price}}元</div>
              <div class="color">所选颜色：{{item.color}}</div>
              <div class="sort">所选配置：{{item.sort}}</div>
            </div>
            <div class="right">
              <el-button
                v-if="item.status != 4 && item.status != 5 && item.status != 6"
                @click="backOrder(item.id)"
              >退 货</el-button>
              <el-button v-if="item.status == 2" @click="deliveryClick(item)">查看快递</el-button>
              <el-button type="primary" v-if="item.status == 2" @click="receiveOrder(item.id)">确认收货</el-button>
              <el-button type="primary" v-if="item.status == 3" @click="commentClick(item)">评 价</el-button>
              <el-button
                v-if="item.status == 4 || item.status == 5 || item.status == 6"
                disabled
              >不可退货</el-button>
              <el-button type="primary" v-if="item.status == 7" disabled>已评价</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button
      v-if="orderList.length < total"
      style="margin: 0 auto; display: flex; margin-bottom: 50px;"
      icon="el-icon-more-outline"
      type="primary"
      @click="getMore"
      plain
    >获取更多</el-button>

    <el-dialog class="commentDialog" title="商品评论" :visible.sync="commentDialog" width="50%">
      <div class="body">
        <div class="group">
          <div class="label">商品满意度：</div>
          <el-rate v-model="comment.star"></el-rate>
          <span>{{comment.star}}.0分</span>
        </div>
        <div class="group">
          <div class="label">商品评价：</div>
          <el-input type="textarea" v-model="comment.content"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialog = false">取 消</el-button>
        <el-button type="primary" @click="commentItem(selectedItem.itemId)">发布评价</el-button>
      </span>
    </el-dialog>

    <el-dialog class="deliveryDialog" title="商品评论" :visible.sync="deliveryDialog" width="50%">
      <div class="body">
        <div class="group">收货地址：{{selectedItem.receive}}</div>
        <div class="group">
          快递单号：{{selectedItem.delivery}}
          <el-button
            class="delivery_btn"
            @click="inquireDelivery"
            size="mini"
            type="primary"
            round
          >查询快递</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deliveryDialog = false">取 消</el-button>
        <el-button type="primary" @click="deliveryDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: [],
      page: 1,
      total: 0,
      selectedItem: {
        itemId: "",
        receive: "",
        delivery: "",
        id: ""
      },
      commentDialog: false,
      comment: {
        itemId: "",
        star: 5,
        content: ""
      },
      deliveryDialog: false
    };
  },
  methods: {
    getOrderList() {
      this.axios
        .get("/getOrderList", {
          params: {
            page: this.page,
            uid: this.$store.state.uid
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.data.count;
            this.orderList = [...this.orderList, ...res.data.data.orderList];
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getMore() {
      this.page++;
      this.getOrderList();
    },
    backOrder(id) {
      this.$confirm("您确定要申请退货吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/backOrder?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.orderList.some(current => {
                  if (current.id == id) {
                    current.status = 4;
                    return true;
                  }
                });
                this.$message.success("申请退货成功");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接，退货失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    },
    receiveOrder(id) {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // TODO: 确认收货
          this.axios
            .get("/receiveOrder?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.orderList.some(current => {
                  if (current.id == id) {
                    current.status = 3;
                    return true;
                  }
                });
                this.$message.success("确认收货成功");
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
    alterStatus(cartId, status) {
      this.orderList.some(current => {
        if (current.id == cartId) {
          current.status = status;
          return true;
        }
      });
    },
    commentClick(item) {
      this.selectedItem = item;
      this.comment.itemId = item.itemId;
      this.comment = {
        itemId: "",
        star: 5,
        content: ""
      };
      this.commentDialog = true;
    },
    commentItem(id) {
      if (this.comment.content == "") {
        this.$message.error("评论内容不能为空！");
        return;
      }
      let obj = {};
      obj.itemId = this.comment.itemId.toString();
      obj.star = this.comment.star.toString();
      obj.content = this.comment.content.toString();
      // TODO: 评论商品
      this.axios
        .post("/commentItem", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("评论成功");
            this.alterStatus(id, 7);
            this.comment = {
              itemId: "",
              star: 5,
              content: ""
            };
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    deliveryClick(item) {
      this.selectedItem = item;
      this.deliveryDialog = true;
    },
    inquireDelivery() {
      window.open("http://www.kuaidi100.com/");
    }
  },
  mounted(){
    this.getOrderList();
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
      &:hover {
        color: #ff6700;
        cursor: pointer;
      }
      span {
        font-size: 16px;
        padding: 5px 10px;
        margin-left: 10px;
        background-color: #409eff;
        border-radius: 5px;
        color: white;
        position: relative;
        bottom: 3px;
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
    }
  }
}

.commentDialog {
  .group {
    display: flex;
    .label {
      width: 90px;
      flex: none;
      margin-bottom: 20px;
    }
    span {
      color: #f7ba2a;
    }
  }
}

.deliveryDialog {
  .group {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .delivery_btn {
    position: relative;
    top: -1px;
    margin-left: 10px;
  }
}
</style>

<style>
.deliveryDialog .el-dialog__body {
  padding-bottom: 0px;
}
</style>