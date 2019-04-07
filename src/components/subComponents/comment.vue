<template>
  <div id="comment">
    <div class="e_card" v-if="commentList.length == 0">暂无评论</div>
    <div class="list e_card" v-for="item in commentList" :key="item.id">
      <div class="header">
        <div class="name">用户：{{item.name}}</div>
        <div class="time">{{$moment(Number(item.time)).format('YYYY年MM月DD日')}}</div>
      </div>
      <el-rate
        v-model="item.star"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}.0分"
      ></el-rate>
      <div class="content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: []
    };
  },
  props: ["itemId"],
  methods: {
    getCommentList() {
      this.axios
        .get("/getComment?id=" + this.itemId)
        .then(res => {
          if (res.data.code == 1) {
            this.commentList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getCommentList();
  }
};
</script>

<style lang='scss' scoped>
.list {
  margin-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #909399;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e7ed;
  }
  .content {
    margin-top: 10px;
  }
}
</style>