<!--
 * @Description: 文件说明
 * @FilePath: \vue-base\src\views\home\index.vue
-->
<template>
  <div class="home">
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="搜索栏"
      @input="$_searchValue"
    />
    <van-notice-bar scrollable :text="text" />
    <van-list>
      <van-cell title="加载数据" @click="$_loadData" />
      <van-cell title="使用日期工具类" :value="`今天是${currentDate}`" />
      <van-cell title="vConsole" />
      <van-cell title="VNK=xxx,这是路由缓存" />
      <van-cell title="点击使用confirm" @click="$_handleUseType" />
    </van-list>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "@vue/composition-api";

// 使用vant 组件
import { List, NoticeBar, Cell, Notify, Toast, Search, Dialog } from "vant";

// 使用日期工具类
import { format, DATE_FMT } from "@/utils/date";

// 接口
import { getDemoData } from "@/api/home";

export default {
  name: "Home",
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [NoticeBar.name]: NoticeBar,
    [Toast.name]: Toast,
    [Search.name]: Search,
  },
  setup() {
    const vm = getCurrentInstance();
    const initText =
      "vue-vant-basecli 基于vant和compositionApi二次封装的移动端cli";
    let currentDate = format(new Date(), DATE_FMT);
    let value = ref("");

    const $_searchValue = vm.$debounce((value) => {
      console.log("value: ", value);
    }, 1000);

    async function $_handleUseType() {
      try {
        await Dialog.confirm({
          message: "................................",
          title: "Dialog title",
        });
        Notify({
          message: `通知栏。。。`,
          type: "success",
        });
      } catch (error) {
        Notify({
          message: `取消了`,
          type: "warning",
        });
      }
    }
    // 加载数据
    async function $_loadData() {
      const loading = vm.$loading();
      try {
        let res = await getDemoData();
        console.log("res: ", res);
        Notify({
          message: res.msg,
          type: "success",
        });
      } catch (error) {
        Notify({
          message: "网络异常",
          type: "warning",
        });
      } finally {
        loading.close();
      }
    }

    return {
      text: initText,
      currentDate,
      value,
      $_searchValue,
      $_handleUseType,
      $_loadData,
    };
  },
};
</script>
//
<style lang="scss" scoped>
.home {
  /** 审查元素，这个样式会转换为 font-size: 4.267vw; */
  font-size: 16px;
}
</style>
