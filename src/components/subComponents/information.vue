<template>
  <div id="information">
    <div class="e_card" v-html="introduction"></div>
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
#information{
  p{
    text-indent: 2em;
  }
}
</style>
