import Vue from "vue";

// 用于控制浏览器前进后退 使用keep-alive
import Navigation from "vue-navigation";

import FastClick from "fastclick";

//lodash工具包
import lodash from "@/lodash";

import App from "./App.vue";
import store from "./store";
import router from "./router";

// 组合式api
import CompositionApi from "@vue/composition-api";

// 安装基础组件 与自定义组件
import BaseComponent from "./base";
import CustomComponent from "./components";

import "@/styles/tailwind.css";

Vue.use(BaseComponent, {});
Vue.use(CustomComponent, {});

Vue.config.productionTip = false;

// 处理点击事件延迟300ms问题
FastClick.attach(document.body);

//lodash工具
lodash(Vue);

// 用于控制浏览器前进后退缓存
Vue.use(Navigation, {
  router,
  store,
});

Vue.use(CompositionApi);

// 开发环境下面使用vConsole进行调试
// if (process.env.NODE_ENV === "development") {
//   const VConsole = require("vconsole");
//   new VConsole();
// }

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
