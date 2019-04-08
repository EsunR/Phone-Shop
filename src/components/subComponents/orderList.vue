<template>
  <div id="orderList" v-loading="loading" element-loading-text="拼命加载中">
    <div class="e_card" v-if="orderList.length == 0" style="margin-top: 20px;">暂无订单</div>
    <div class="list e_card" v-for="item in orderList" :key="item.id">
      <div class="img_box">
        <img :src="item.cover">
      </div>
      <div class="info_box">
        <div class="title">
          <div class="left" @click="gotoDetail(item.itemId)">
            {{item.title}}
            <span>{{item.status | orderStatus}}</span>
          </div>
          <div class="right">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small "
              circle
              @click="deleteOrder(item.id)"
            ></el-button>
          </div>
        </div>
        <hr>
        <div class="bottom">
          <div class="left">
            <div class="price">订单总价：{{item.price}}元</div>
            <div class="color">所选颜色：{{item.color}}</div>
            <div class="sort">所选配置：{{item.sort}}</div>
            <div class="sort">用户：{{item.userName}}</div>
          </div>
          <div class="right">
            <el-button v-if="item.status == 1" @click="publishOrderClick(item)" type="primary">发 货</el-button>
            <el-button
              v-if="item.status == 4"
              type="danger"
              @click="manageBackOrder(item.id, '5')"
            >确认退货</el-button>
            <el-button
              v-if="item.status == 4"
              type="info"
              @click="manageBackOrder(item.id, '6')"
            >拒绝退货</el-button>
            <div v-if="item.status == 2">快递单号：{{item.delivery}}</div>
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

    <el-dialog
      class="publishOrderDialog"
      title="订单发货"
      :visible.sync="publishOrderDialog"
      width="50%"
    >
      <div class="body">
        <div class="group">
          <div class="label">收货地址：{{selected.receive}}</div>
        </div>
        <div class="group">
          <el-input v-model="delivery" placeholder="请填写快递单号"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="publishOrderDialog = false">取 消</el-button>
        <el-button type="primary" @click="publishOrder()">发 货</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      page: 1,
      total: 100,
      orderList: [],
      publishOrderDialog: false,
      selected: {
        id: "",
        receive: "",
        userName: ""
      },
      delivery: ""
    };
  },
  props: ["status", "uid"],
  methods: {
    getOrderList() {
      this.loading = true;
      let obj = {};
      obj.page = this.page;
      if (this.status != 0) {
        obj.status = this.status;
      }
      if (this.uid) {
        obj.uid = this.uid;
      }
      this.axios
        .get("/getOrderList", {
          params: obj
        })
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.data.total;
            this.orderList = [...this.orderList, ...res.data.data.orderList];
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
          this.loading = false;
        });
    },
    publishOrderClick(item) {
      this.selected.id = item.id;
      this.selected.receive = item.receive;
      this.selected.userName = item.userName;
      this.delivery = "";
      this.publishOrderDialog = true;
    },
    publishOrder() {
      if (this.delivery == "" || !/^[0-9]+$/.test(this.delivery)) {
        this.$message.error("请填写正确的快递单号");
        return;
      }
      this.$confirm("您确定要发货吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/publishOrder", {
              id: this.selected.id,
              delivery: this.delivery
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("订单已发货");
                this.page = 1;
                this.orderList = [];
                this.getOrderList();
                this.publishOrderDialog = false;
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
    manageBackOrder(id, status) {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/manageBackOrder", { id, status })
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("订单已处理");
                this.page = 1;
                this.orderList = [];
                this.getOrderList();
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
    deleteOrder(id) {
      this.$confirm("您确定要删除订单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteOrder?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("删除成功");
                this.page = 1;
                this.orderList = [];
                this.getOrderList();
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
    getMore() {
      this.page++;
      this.getOrderList();
    },
    gotoDetail(id) {
      this.$router.push("/itemManage/modifyItem/" + id);
    }
  },
  mounted() {
    this.getOrderList();
  },
  watch: {
    status: function() {
      this.page = 1;
      this.orderList = [];
      this.getOrderList();
    },
    uid: function() {
      this.page = 1;
      this.orderList = [];
      this.getOrderList();
    }
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
      display: flex;
      justify-content: space-between;
      .left {
        margin-right: 20px;
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

.publishOrderDialog {
  .group {
    font-size: 16px;
    .label {
      margin-bottom: 20px;
      padding-left: 5px;
    }
  }
}
</style>