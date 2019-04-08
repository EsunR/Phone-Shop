<template>
  <div id="userManage">
    <h1>用户列表</h1>
    <div class="list e_card" v-for="item in userList" :key="item.id">
      <div class="info_box">
        <div class="id info">用户ID：{{item.id}}</div>
        <div class="name info">用户账号：{{item.account}}</div>
        <div class="money info">账户余额：{{item.money}}元</div>
      </div>
      <div class="btn_box">
        <el-button type="danger" @click="deleteUser(item.id)">删除用户</el-button>
        <el-button type="primary" @click="showOrder(item.id)">查看用户订单</el-button>
      </div>
    </div>

    <el-dialog class="orderDialog" title="用户订单" :visible.sync="orderDialog" width="1000px">
      <div class="body">
        <orderList :status="0" :uid="selectedUid"></orderList>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialog = false">取 消</el-button>
        <el-button @click="orderDialog = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import orderList from "../subComponents/orderList.vue";
export default {
  data() {
    return {
      userList: [],
      orderDialog: false,
      selectedUid: ""
    };
  },
  components: {
    orderList
  },
  methods: {
    getUserList() {
      this.axios
        .get("/getUserList")
        .then(res => {
          if (res.data.code == 1) {
            this.userList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    deleteUser(id) {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteUser?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("删除成功");
                this.getUserList();
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
    showOrder(id) {
      this.selectedUid = id;
      this.orderDialog = true;
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style lang='scss' scoped>
.list {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    line-height: 1.7;
  }
}
</style>