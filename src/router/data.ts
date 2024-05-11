import { RouteRecordRaw } from "vue-router";
import RemainingRouter from "./modules/remaining";

/** 布局 */
export const LAYOUT = () => import("@/layouts/index.vue");

/** 获取本地静态路由 */
export const getLocalRoutes = () => {
  const routes = [];
  const modules: Record<string, any> = import.meta.glob(
    ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
    {
      eager: true
    }
  );
  Object.keys(modules).forEach((key) => {
    routes.push(modules[key].default);
  });
  return routes;
};

/** 本地静态路由（未做任何处理）*/
export const localRoutes = getLocalRoutes();

/** 静态路由 */
export const constantRoutes: RouteRecordRaw[] = localRoutes.concat(...RemainingRouter);

/** 路由白名单 */
export const WHITE_LIST = ["/login"];

/** 路由模块 */
export const ModulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");

export const IFrame = () => import("@/layouts/frameView.vue");
