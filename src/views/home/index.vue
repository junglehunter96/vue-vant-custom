<template>
  <div>
    <router-view />
    <van-tabbar
      v-model="active"
      active-color="#07c160"
      inactive-color="#000"
      fixed
    >
      <van-tabbar-item icon="search" to="/" name="home">首页</van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/404" name="404">404</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, NavBar } from "vant";
import { ref, onActivated, getCurrentInstance } from "@vue/composition-api";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
  },
  setup() {
    let active = ref("home");
    let vm = getCurrentInstance();
    onActivated(() => {
      active.value = vm.$route.meta.name;
    });
    return {
      active,
    };
  },
};
</script>

<style lang="scss" scoped></style>
