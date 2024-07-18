import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/index.vue";
import Layout from "../layout/index.vue";

// const routes = [{ path: "/", component: () => import("../views/index.vue") }];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        meta: {
          title: import.meta.env.VITE_TITLE,
        },
        component: Index,
      },
    ],
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
