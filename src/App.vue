<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="title">
          <i class="el-icon-mobile-phone"></i> 手机销售系统
        </div>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="itemManage" v-if="identity == 'admin'">商品管理</el-menu-item>
          <el-menu-item index="orderManage" v-if="identity == 'admin'">订单管理</el-menu-item>
          <el-menu-item index="userManage" v-if="identity == 'admin'">用户管理</el-menu-item>
          <el-menu-item index="home" v-if="identity == 'user'">首页</el-menu-item>
          <el-submenu index="select">
            <template slot="title" v-if="identity == 'admin'">菜单</template>
            <el-menu-item index="cart" v-if="identity == 'user'">购物车</el-menu-item>
            <el-menu-item index="order" v-if="identity == 'user'">已购买</el-menu-item>
            <el-menu-item index="userInfo">用户中心</el-menu-item>
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
      activeIndex: "home",
      identity: ""
    };
  },
  methods: {
    getUserInfo() {
      this.axios
        .get("/getUserInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.identity = res.data.data.identity;
            this.$store.commit("setData", res.data.data);
            if (this.$store.state.identity == "admin") {
              this.$router.push("/itemManage");
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
    this.activeIndex = this.$route.path.split("/")[1];
    this.getUserInfo();
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

