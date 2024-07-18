import { createApp } from "vue";
import "virtual:svg-icons-register";
import App from "./App.vue";
import router from "./router/index";
// import "normalize.css";
import "ant-design-vue/dist/reset.css";
import "./assets/styles/index.less";
import { registerComponents } from "./components/index";

const app = createApp(App);
app.use(router);
app.mount("#app");
// 注册全局组件
registerComponents(app);
