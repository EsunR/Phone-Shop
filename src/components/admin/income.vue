<template>
  <div id="money">
    <h1>
      <i class="el-icon-date"></i> 查看收入
    </h1>
    <div class="e_card table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="300px"></el-table-column>
        <el-table-column prop="time" label="区间"></el-table-column>
        <el-table-column prop="money" label="总收入"></el-table-column>
        <el-table-column prop="sale" label="总销量"></el-table-column>
      </el-table>
    </div>
    <h1>
      <i class="el-icon-date"></i> 自定义查看
    </h1>
    <div class="e_card time_picker">
      <div class="top">
        <el-date-picker
          v-model="timeSpan"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          format="yyyy年MM月dd日"
        ></el-date-picker>
        <el-button type="primary" size="medium" @click="search">查询</el-button>
      </div>
      <div class="bottom">
        <el-table :data="searchTable" style="width: 100%">
          <el-table-column prop="date" label="日期" width="300px"></el-table-column>
          <el-table-column prop="money" label="总收入"></el-table-column>
          <el-table-column prop="sale" label="总销量"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: `${this.$moment()
            .startOf("week")
            .format("YYYY年MM月DD日")} ~ ${this.$moment()
            .endOf("week")
            .format("YYYY年MM月DD日")}`,
          time: "周收入",
          money: "",
          sale: ""
        },
        {
          date: `${this.$moment()
            .startOf("month")
            .format("YYYY年MM月DD日")} ~ ${this.$moment()
            .endOf("month")
            .format("YYYY年MM月DD日")}`,
          time: "月收入",
          money: "",
          sale: ""
        },
        {
          date: `${this.$moment()
            .startOf("year")
            .format("YYYY年MM月DD日")} ~ ${this.$moment()
            .endOf("year")
            .format("YYYY年MM月DD日")}`,
          time: "年收入",
          money: "",
          sale: ""
        }
      ],
      searchTable: [],
      timeSpan: ""
    };
  },
  methods: {
    getSaleData(time1, time2) {
      var promise = new Promise((resolve, reject) => {
        this.axios
          .get("/getSaleData", { params: { time1, time2 } })
          .then(res => {
            if (res.data.code == 1) {
              let obj = {
                sale: res.data.data.sale,
                money: res.data.data.money
              };
              resolve(obj);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("服务器无法连接");
            return reject;
          });
      });
      return promise;
    },
    initData() {
      // 周销量
      this.getSaleData(
        this.$moment()
          .startOf("week")
          .valueOf(),
        this.$moment()
          .endOf("week")
          .valueOf()
      ).then(data => {
        this.tableData[0].sale = data.sale + "件";
        this.tableData[0].money = data.money + "元";
      });
      // 月销量
      this.getSaleData(
        this.$moment()
          .startOf("month")
          .valueOf(),
        this.$moment()
          .endOf("month")
          .valueOf()
      ).then(data => {
        this.tableData[1].sale = data.sale + "件";
        this.tableData[1].money = data.money + "元";
      });
      // 年销量
      this.getSaleData(
        this.$moment()
          .startOf("year")
          .valueOf(),
        this.$moment()
          .endOf("year")
          .valueOf()
      ).then(data => {
        this.tableData[2].sale = data.sale + "件";
        this.tableData[2].money = data.money + "元";
      });
    },
    search() {
      if (this.timeSpan.length != 0) {
        this.getSaleData(this.timeSpan[0], this.timeSpan[1]).then(data => {
          let obj = {};
          obj.date = `${this.$moment(Number(this.timeSpan[0])).format(
            "YYYY年MM月DD日"
          )} ~ ${this.$moment(Number(this.timeSpan[1])).format(
            "YYYY年MM月DD日"
          )}`;
          obj.money = data.money;
          obj.sale = data.sale;
          this.searchTable = [];
          this.searchTable = [obj];
        });
      }
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang='scss' scoped>
.e_card {
  margin: 20px 0;
}
.time_picker {
  .top {
    .el-button {
      margin-left: 20px;
    }
  }
  .bottom{
    margin-top: 20px;
  }
}
</style>