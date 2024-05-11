import { createWebHashHistory, createWebHistory, RouteRecordRaw, RouterHistory } from "vue-router";

import { getRouterApi } from "@/api/auth";
import { router } from "./index";
import { buildHierarchyTree, cloneDeep, intersection, isAllEmpty } from "@pureadmin/utils";
import { usePermissionStoreHook } from "@/stores/modules/permission";
import { IFrame, ModulesRoutes } from "./data";

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
export const getHistoryMode = (): RouterHistory => {
  const mode = import.meta.env.VITE_ROUTER_HISTORY;
  return mode === "h5" ? createWebHistory() : createWebHashHistory();
};

export function initRouter() {
  return new Promise((resolve) => {
    getRouterApi().then(({ data }) => {
      handleAsyncRoutes(cloneDeep(data));
      resolve({ router, data });
    });
  });
}

/** 处理动态路由 */
const handleAsyncRoutes = (routeList: any[]) => {
  console.log(routeList);
  if (routeList.length == 0) {
    usePermissionStoreHook().handleWholeMenus(routeList);
  } else {
    formatFlatteningRoutes(addAsyncRoutes(routeList)).map((v: RouteRecordRaw) => {
      // 防止重复添加路由
      if (router.options.routes[0].children.findIndex((value) => value.path === v.path) !== -1) {
        return;
      } else {
        // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
        router.options.routes[0].children.push(v);
        // 最终路由进行升序
        ascending(router.options.routes[0].children);
        if (!router.hasRoute(v?.name)) router.addRoute(v);
        const flattenRouters: any = router.getRoutes().find((n) => n.path === "/");
        router.addRoute(flattenRouters);
      }
    });

    usePermissionStoreHook().handleWholeMenus(routeList);
  }
  addPathMatch();
};

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/** 过滤后端传来的动态路由 重新生成规范路由 */
function addAsyncRoutes(arrRoutes: Array<RouteRecordRaw>) {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(ModulesRoutes);
  arrRoutes.forEach((v: RouteRecordRaw) => {
    // 将backstage属性加入meta，标识此路由为后端返回路由
    v.meta.backstage = true;
    // 父级的redirect属性取值：如果子级存在且父级的redirect属性不存在，默认取第一个子级的path；如果子级存在且父级的redirect属性存在，取存在的redirect属性，会覆盖默认值
    if (v?.children && v.children.length && !v.redirect) v.redirect = v.children[0].path;
    // 父级的name属性取值：如果子级存在且父级的name属性不存在，默认取第一个子级的name；如果子级存在且父级的name属性存在，取存在的name属性，会覆盖默认值（注意：测试中发现父级的name不能和子级name重复，如果重复会造成重定向无效（跳转404），所以这里给父级的name起名的时候后面会自动加上`Parent`，避免重复）
    if (v?.children && v.children.length && !v.name)
      v.name = (v.children[0].name as string) + "Parent";
    if (v.meta?.frameSrc) {
      v.component = IFrame;
    } else {
      // 对后端传component组件路径和不传做兼容（如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会跟path保持一致）
      const index = v?.component
        ? modulesRoutesKeys.findIndex((ev) => ev.includes(v.component as any))
        : modulesRoutesKeys.findIndex((ev) => ev.includes(v.path));
      v.component = ModulesRoutes[modulesRoutesKeys[index]];
    }
    if (v?.children && v.children.length) {
      addAsyncRoutes(v.children);
    }
  });
  return arrRoutes;
}

function handRank(routeInfo: any) {
  const { name, path, parentId, meta } = routeInfo;
  return isAllEmpty(parentId)
    ? isAllEmpty(meta?.rank) || (meta?.rank === 0 && name !== "Home" && path !== "/")
      ? true
      : false
    : false;
}

/** 按照路由中meta下的rank等级升序来排序路由 */
function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    // 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
    if (handRank(v)) v.meta.rank = index + 2;
  });
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta.rank - b?.meta.rank;
  });
}
