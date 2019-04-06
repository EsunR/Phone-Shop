<template>
  <div id="addItem">
    <h1>添加商品</h1>
    <itemForm class="itemForm"></itemForm>
  </div>
</template>

<script>
import itemForm from "../subComponents/itemForm.vue";
export default {
  data() {
    return {};
  },
  components: {
    itemForm
  }
};
</script>

<style lang='scss' scoped>
.itemForm {
  margin-top: 20px;
}
</style>