<template>
  <div id="information">
    <div class="e_card main" v-html="introduction"></div>
  </div>
</template>

<script>
export default {
  props: ["introduction"]
};
</script>

<style lang='scss' scoped>
.e_card {
  padding: 1px 20px;
}
</style>

<style lang="scss">
.main{
  box-sizing: border-box;
  line-height: 1.7;
  padding: 30px !important;
  dd{
    margin-left: 0;
  }
  img{
    width: 100%;
    border-radius: 10px;
  }
}
</style>
