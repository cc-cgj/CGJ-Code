<script setup lang="ts">
// ConfigProvider 不包含时间类组件的国际化，你需要额外引入时间库(dayjs、momentjs、date-fns 等)的国际化文件
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const theme = {
  token: {
    colorPrimary: "#355DEE",
  },
  components: {
    Steps: {
      controlItemBgActive: "#355DEE",
    },
    Form: {
      // controlHeight: 24,
    },
  },
};
</script>

<template>
  <a-config-provider :theme="theme" :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<style scoped></style>
