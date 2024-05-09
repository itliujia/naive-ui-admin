import remainingRouter from "./modules/remaining";
import { sortRankRoute } from "./utils";

/**
 * 自动导入全部静态路由，无需再手动引入！
 *
 * 匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 *
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 *
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true,
  }
);

/** 获取静态路由 */
const getConstantRoutes = () => {
  /** 静态路由（未做任何处理） */
  const routeList = [];
  Object.keys(modules).forEach((key) => {
    routeList.push(modules[key].default);
  });
  return routeList;
};

/** 路由白名单 */
const whiteList = ["/login"];

/** 不参与菜单的路由 */
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path;
});

/** 静态路由（未做任何处理） */
const constantRoutes = getConstantRoutes();

/** 本地静态路由升序 */
const sortedRoute = sortRankRoute(constantRoutes.flat(Infinity));

export { getConstantRoutes, whiteList, remainingRouter };
