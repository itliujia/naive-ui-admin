import { createRouter } from "vue-router";
import type { Router } from "vue-router";

import { getHistoryMode } from "./utils";

/** 创建路由实例 */
const router: Router = createRouter({
  history: getHistoryMode(),
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: () => import("@/views/login/index.vue"),
      meta: {
        title: "首页"
      }
    }
  ],
  strict: true,
  scrollBehavior(_to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition;
      }
      if (from.meta?.saveSrollTop) {
        const top: number = document.documentElement.scrollTop || document.body.scrollTop;
        resolve({ left: 0, top });
      }
    });
  }
});

export { router };
