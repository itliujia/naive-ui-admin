import { createWebHashHistory, createWebHistory, RouterHistory } from "vue-router";

/**
 * 获取路由历史模式
 * @see https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
 */
export const getHistoryMode = (): RouterHistory => {
  const mode = import.meta.env.VITE_ROUTER_HISTORY;
  return mode === "h5" ? createWebHistory() : createWebHashHistory();
};
