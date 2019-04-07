<template>
  <div id="itemForm" class="e_card">
    <div class="group">
      <div class="title">商品标题：</div>
      <el-input v-model="form.title" placeholder="请填写商品标题"></el-input>
    </div>

    <div class="group">
      <div class="title">上传商品封面：</div>
      <el-upload
        action="http://upload.qiniup.com"
        :on-success="uploadSuccess"
        :limit="1"
        list-type="picture-card"
        :data="postData"
        accept=".png, .jpg"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
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
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="title">库存：</div>
          <el-input v-model="form.stock" placeholder="请填写已有的库存量（单位：件）"></el-input>
        </el-col>
        <el-col :span="12">
          <div class="title">商品状态：</div>
          <el-select v-model="form.status" style="width: 100%" placeholder="请选择">
            <el-option label="上架中" value="1"></el-option>
            <el-option label="已下架" value="0"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="group">
      <div class="title">商品介绍：</div>
      <div id="editor"></div>
    </div>

    <el-button type="primary" @click="submitClick">发布商品</el-button>
  </div>
</template>

<script>
import E from "wangeditor";
var editor = new E("#editor");
editor.customConfig.zIndex = 1;

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
      sortArr: [],
      postData: {
        // 测试token
        token:
          "noucWTUuRY84Z0DSDJyJiszjO7OtRY3Vtj4yAWT1:1D6bk4yfCW51XqjgG-igP_Bi6dc=:eyJzY29wZSI6Im5vdmVsLXN5c3RlbSIsImRlYWRsaW5lIjoxNTc1MTI5NjAwfQ=="
      }
    };
  },
  props: ["itemData"],
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
    },
    uploadSuccess(res) {
      this.form.cover = "http://study.esunr.xyz/" + res.key;
    },
    formatData(callback) {
      let form = this.form;
      this.form.introduction = editor.txt.html();
      if (this.colorArr.length == 0) {
        this.$message.error("请填写商品可选颜色");
        return false;
      }
      let color = this.colorArr.map(current => {
        return current.color;
      });
      if (this.sortArr.length == 0) {
        this.$message.error("请填写商品可选配置");
        return false;
      }
      let sort = this.sortArr.map(current => {
        let obj = {
          sort: current.sort,
          price: current.price
        };
        return obj;
      });
      form.color = color;
      form.sort = sort;
      form.price = form.sort[0].price;
      form.time = Date.parse(new Date()).toString();
      callback();
    },
    verifyData() {
      for (let key in this.form) {
        if (this.form[key] == "") {
          this.$message.error("发布失败，请检查填写信息是否有遗漏项");
          return false;
        }
      }
      return true;
    },
    submitClick() {
      this.formatData(() => {
        if (this.verifyData()) {
          if(this.form.id){
            this.modifyItem();
          }else{
            this.publishItem();
          }
        }
      });
    },
    publishItem() {
      this.axios
        .post("/publishItem", this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("发布成功！");
            this.$router.push("/itemManage");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    modifyItem(){
      this.axios
        .post('/modifyItem', this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success('修改成功');
          }
      })
      .catch(err => {
        console.log(err);
        this.$message('服务器无法连接');
      });
    },
    initData() {
      let form = this.form;
      let data = this.itemData;
      form.id = data.id.toString();
      form.title = data.title;
      form.stock = data.stock.toString();
      form.status = data.status.toString();
      form.cover = data.cover;
      this.colorArr = data.color.map((current, index) => {
        let obj = {
          key: index,
          color: current
        };
        return obj;
      });
      this.sortArr = data.sort.map((current, index) => {
        let obj = {
          key: index,
          sort: current.sort,
          price: current.price
        };
        return obj;
      });
      editor.txt.html(data.introduction);
    }
  },
  mounted() {
    editor.create();
  },
  watch: {
    itemData: function() {
      this.initData();
    }
  }
};
</script>

<style lang='scss' scoped>
.group {
  margin-bottom: 20px;
  .title {
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