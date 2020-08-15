<template>
  <div>
    <van-nav-bar
      v-if="$route.meta.hiddenNav !== true"
      :title="$route.meta.title"
      left-arrow
    />
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
export default {
  data() {
    return {
      active: "home",
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [NavBar.name]: NavBar,
  },
  activated() {
    this.active = this.$route.meta.name;
  },
};
</script>

<style lang="scss" scoped></style>
