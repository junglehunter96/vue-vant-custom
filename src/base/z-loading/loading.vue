<template>
  <van-overlay :show="loading" class="d-flex jc-center ai-center">
    <van-loading />
  </van-overlay>
</template>
<script>
import { Overlay, Loading } from "vant";
export default {
  components: {
    [Overlay.name]: Overlay,
    [Loading.name]: Loading
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>

