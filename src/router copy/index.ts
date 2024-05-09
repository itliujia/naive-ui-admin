import {
  createRouter,
  RouteComponent,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { getConstantRoutes, remainingRouter, whiteList } from "./data";
import { getHistoryMode, sortRankRoute } from "./utils";
import { buildHierarchyTree } from "@pureadmin/utils";

/** 静态路由（未做任何处理） */
const constantRoutes = getConstantRoutes();

/** 本地静态路由升序 */
const descRoutes = sortRankRoute(constantRoutes.flat(Infinity));

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: RouteComponent[] = descRoutes.concat(
  ...remainingRouter
);

// /** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const localRoutes: RouteRecordRaw[] = buildHierarchyTree(
  sortRankRoute(constantRoutes.flat(Infinity))
);

/** 创建路由实例 */
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

export default router;
