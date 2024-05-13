import { createWebHashHistory, createWebHistory, RouteRecordRaw, RouterHistory } from "vue-router";

import { getRouterApi } from "@/api/auth";
import { router } from "./index";
import { cloneDeep } from "@pureadmin/utils";
import { usePermissionStoreHook } from "@/stores/modules/permission";
import { IFrame, ModulesRoutes, getRootRoute } from "./data";

/** 添加路由匹配 */
const addPathMatch = () => {
  if (!router.hasRoute("pathMatch")) {
    router.addRoute({
      path: "/:pathMatch(.*)",
      name: "pathMatch",
      redirect: "/403"
    });
  }
};

/**
 * 获取路由历史模式
 * @see https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
 */
export const getHistoryMode = (mode: string): RouterHistory =>
  mode === "h5" ? createWebHistory() : createWebHashHistory();

/** 初始化路由 */
export const initRouter = () =>
  new Promise((resolve) => {
    getRouterApi().then(({ data }) => {
      // console.log("getRouterData:", data);
      handleAsyncRoutes(cloneDeep(data));
      resolve({ router, data });
    });
  });

/** 处理动态路由 */
const handleAsyncRoutes = (routeList: any[]) => {
  if (routeList.length == 0) {
    usePermissionStoreHook().handleWholeMenus(routeList);
  } else {
    const asyncRoutes = addAsyncRoutes(routeList);
    addRoute(asyncRoutes);
    usePermissionStoreHook().handleWholeMenus(routeList);
  }
  addPathMatch();
};

/** 过滤后端传来的动态路由 重新生成规范路由 */
const addAsyncRoutes = (arrRoutes: RouteRecordRaw[]) => {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(ModulesRoutes);

  arrRoutes.forEach((v: RouteRecordRaw) => {
    // 将backstage属性加入meta，标识此路由为后端返回路由
    v.meta.backstage = true;

    // 父级的redirect属性取值
    // 如果子级存在且父级的redirect属性不存在，默认取第一个子级的path
    // 如果子级存在且父级的redirect属性存在，取存在的redirect属性，会覆盖默认值
    if (v?.children && v.children.length && !v?.redirect) {
      v.redirect = v.children[0].path;
    }

    // 父级的name属性取值
    // 如果子级存在且父级的name属性不存在，默认取第一个子级的name
    // 如果子级存在且父级的name属性存在，取存在的name属性，会覆盖默认值
    // 注意：测试中发现父级的name不能和子级name重复，如果重复会造成重定向无效（跳转404）
    // 所以这里给父级的name起名的时候后面会自动加上`Parent`，避免重复
    if (v?.children && v.children.length && !v?.name) {
      v.name = String(v.children[0].name) + "Parent";
    }

    if (v.meta?.frameSrc) {
      v.component = IFrame;
    } else {
      // 对后端传component组件路径和不传做容兼
      // 如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会跟path保持一致
      const index = v?.component
        ? modulesRoutesKeys.findIndex((ev) => ev.includes(v?.component as any))
        : modulesRoutesKeys.findIndex((ev) => ev.includes(v?.path));
      v.component = ModulesRoutes[modulesRoutesKeys[index]];
    }

    if (v?.children && v.children.length) {
      addAsyncRoutes(v.children);
    }
  });

  return arrRoutes;
};

/** 添加路由 */
const addRoute = (routeList: RouteRecordRaw[]) => {
  if (routeList.length === 0) {
    return;
  }

  setRouterRank(routeList);
  routeList.map(() => {
    setRouterRank(router.options.routes[0]?.children);
  });

  const redirect = routeList[0].path;
  const RootRoute = getRootRoute(redirect, routeList);
  router.addRoute(RootRoute);
};

/** 设置路由次序 */
export const setRouterRank = (arr: any[], sort = -1) =>
  arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return (a?.meta.rank - b?.meta.rank) * sort;
  });
