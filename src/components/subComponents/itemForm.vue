<template>
  <div id="itemForm" class="e_card">
    <div class="group">
      <div class="title">商品标题：</div>
      <el-input v-model="form.title"></el-input>
    </div>

    <div class="options group">
      <div class="left">
        <div class="title">可选颜色：</div>
        <div class="input_group" v-for="item in colorArr" :key="item.key">
          <el-input placeholder="填写颜色" v-model="item.color"></el-input>
          <el-button type="danger" icon="el-icon-delete" @click="deleteColor(item)" circle></el-button>
        </div>
        <el-button
          class="add_btn"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addColor"
        >添加颜色</el-button>
      </div>
      <div class="right">
        <div class="title">可选配置：</div>
        <div class="input_group" v-for="item in sortArr" :key="item.key">
          <el-input placeholder="填写配置" v-model="item.sort"></el-input>
          <el-input placeholder="填写售价（单位：元）" v-model="item.price"></el-input>
          <el-button type="danger" icon="el-icon-delete" @click="deleteSort(item)" circle></el-button>
        </div>
        <el-button
          class="add_btn"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addSort"
        >添加配置</el-button>
      </div>
    </div>

    <div class="group">
      <div class="title">库存：</div>
      <el-input v-model="form.stock" placeholder="请填写已有的库存量（单位：件）"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        price: "",
        stock: "",
        introduction: "",
        color: [],
        sort: [],
        status: "",
        cover: "",
        time: ""
      },
      colorArr: [],
      sortArr: []
    };
  },
  methods: {
    addColor() {
      this.colorArr.push({
        color: "",
        key: Date.now()
      });
    },
    deleteColor(item) {
      var index = this.colorArr.indexOf(item);
      if (index !== -1) {
        this.colorArr.splice(index, 1);
      }
    },
    addSort() {
      this.sortArr.push({
        key: Date.now(),
        price: "",
        sort: ""
      });
    },
    deleteSort(item) {
      var index = this.sortArr.indexOf(item);
      if (index !== -1) {
        this.sortArr.splice(index, 1);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.group {
  margin-bottom: 20px;
  .title {
    padding-left: 5px;
    margin-bottom: 10px;
  }
}
.options {
  display: flex;
  .left {
    flex: 1;
    margin-right: 40px;
    .input_group {
      display: flex;
      margin-bottom: 20px;
      .el-input {
        margin-right: 20px;
      }
    }
    .add_btn {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    .input_group {
      display: flex;
      margin-bottom: 20px;
      .el-input {
        margin-right: 20px;
      }
    }
    .add_btn {
      width: 100%;
    }
  }
}
</style>