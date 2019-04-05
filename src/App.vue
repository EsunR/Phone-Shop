<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="title">
          <i class="el-icon-mobile-phone"></i> 手机销售系统
        </div>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="home">首页</el-menu-item>
          <el-submenu index="select">
            <template slot="title">用户中心</template>
            <el-menu-item index="cart">购物车</el-menu-item>
            <el-menu-item index="order">已购买</el-menu-item>
            <el-menu-item index="userInfo">个人信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "home"
    };
  },
  methods: {
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.$store.state.commit("setData", this.data.data);
            if (this.$store.state.identity == "admin") {
              this.$router.push("/admin");
            } else {
              this.$router.push("/");
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    handleSelect(index) {
      this.$router.push("/" + index);
    }
  },
  mounted() {
    // this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  .title {
    line-height: 60px;
    padding-left: 20px;
    font-size: 18px;
    color: #606266;
    i {
      color: #409eff;
      font-weight: bold;
    }
  }
  .el-menu {
    border-bottom: none;
  }
}
.el-main {
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}
</style>

