import { defineStore } from "pinia";
import { store } from "../index";

export const usePermissionStore = defineStore({
  id: "baddog-permission",
  state: () => ({
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: []
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = routes;
      this.flatteningRoutes = routes;
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    }
  }
});

export const usePermissionStoreHook = () => usePermissionStore(store);
