<template>
  <div>
    <van-empty image="error" description="页面走丢了" />
    <div class="flex justify-center pt-1 text-base">
      返回首页
      <!-- <van-button type="primary" to="/">返回首页</van-button> -->
    </div>
  </div>
</template>
<script>
import { Empty, Button } from "vant";
export default {
  components: {
    [Empty.name]: Empty,
    [Button.name]: Button,
  },
};
</script>
<style lang="scss" scoped>
// .box {
//   color: map-get($colors, "main");
// }
</style>
