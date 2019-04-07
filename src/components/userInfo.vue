<template>
  <div id="userInfo">
    <h1>
      <i class="el-icon-info"></i>
      用户中心
      <el-button
        type="danger"
        size="mini"
        style="position: relative; bottom: 3px; margin-left: 10px;"
        @click="logout"
      >注销</el-button>
    </h1>
    <div class="panel e_card" v-if="this.$store.state.identity == 'user'">
      <div class="title">个人信息</div>
      <hr>
      <el-form :model="userInfo" ref="userInfo" :label-position="'top'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户称呼" prop="name" required>
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货地址" prop="receive" required>
              <el-input v-model="userInfo.receive"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button
        type="primary"
        style="display: flex; margin: 0 auto; margin-top: 20px;"
        size="medium"
        @click="modifyUserInfo"
      >确定修改</el-button>
    </div>

    <div class="panel e_card">
      <div class="title">修改密码</div>
      <hr>
      <el-form :model="password" ref="password" :label-position="'top'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="原始密码" prop="oldPwd" required>
              <el-input type="password" v-model="password.oldPwd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新密码" prop="newPwd" required>
              <el-input type="password" v-model="password.newPwd"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button
        type="primary"
        style="display: flex; margin: 0 auto; margin-top: 20px;"
        size="medium"
        @click="modifyPwd"
      >确定修改</el-button>
    </div>

    <div class="panel e_card" v-if="this.$store.state.identity == 'user'">
      <div class="title">账户余额：{{money}} 元</div>
      <hr>
      <el-input v-model="recharge">
        <el-button slot="append" icon="el-icon-circle-check" @click="rechargeMoney">充值</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        receive: ""
      },
      password: {
        oldPwd: "",
        newPwd: ""
      },
      rules: [],
      money: "",
      recharge: ""
    };
  },
  methods: {
    getSetUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.$store.commit("setData", res.data.data);
            this.userInfo.name = res.data.data.name;
            this.userInfo.receive = res.data.data.receive;
            this.money = res.data.data.money;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    modifyUserInfo() {
      if (this.userInfo.name == "" || this.userInfo.receive == "") {
        this.$message.error("内容不能为空");
        return;
      } else {
        // TODO: 修改信息
        this.axios
          .post("/modifyUserInfo", this.userInfo)
          .then(res => {
            if (res.data.code == 1) {
              this.$message.success("修改成功");
              this.getSetUserInfo();
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("服务器无法连接");
          });
      }
    },
    modifyPwd() {
      if (this.password.oldPwd == "" || this.password.newPwd == "") {
        this.$message.error("内容不能为空");
        return;
      } else {
        this.axios
          .post("/modifyPwd", this.password)
          .then(res => {
            if (res.data.code == 1) {
              this.password.oldPwd = "";
              this.password.newPwd = "";
              this.$message.success("修改成功");
            } else {
              this.$message.error("原始密码不正确");
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("服务器无法连接");
          });
      }
    },
    rechargeMoney() {
      if (this.recharge == "" || !/^[0-9]*(|.[0-9]+)$/.test(this.recharge)) {
        this.$message.error("请检查输入的内容");
        return;
      }
      this.axios
        .get("/recharge?money=" + this.recharge)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("充值成功");
            this.recharge = 0;
            this.getSetUserInfo();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    logout() {
      window.location.href = this.COMMON.login_location;
      localStorage.clear();
    }
  },
  mounted() {
    this.getSetUserInfo();
  }
};
</script>

<style lang='scss' scoped>
.panel {
  margin-top: 20px;
}
</style>