import { createRouter } from "vue-router";
import type { Router } from "vue-router";

import { getHistoryMode, initRouter } from "./utils";
import { constantRoutes, WHITE_LIST } from "./data";
import { AUTH_KEY } from "@/utils/auth";
import { isAllEmpty, isUrl, openLink, storageLocal } from "@pureadmin/utils";
import siteConfig from "@build/settings/site";
import { usePermissionStoreHook } from "@/stores/modules/permission";
import { AuthDataType } from "@/typings/auth";

/** 创建路由实例 */
export const router: Router = createRouter({
  history: getHistoryMode(),
  routes: constantRoutes,
  // [
  //   {
  //     path: "/",
  //     name: "Welcome",
  //     component: Layout,
  //     redirect: "/home",
  //     children: [
  //       {
  //         path: "/home",
  //         name: "Home",
  //         component: () => import("@/views/home/index.vue"),
  //         meta: {
  //           title: "首页"
  //         }
  //       }
  //     ]
  //   }
  // ],
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

/** 路由守卫 */
router.beforeEach((to: ToRouteType, _from, next) => {
  const userInfo = storageLocal().getItem<AuthDataType>(AUTH_KEY);

  /** 是否为超链接 */
  const externalLink = isUrl(to?.name as string);

  if (!externalLink) {
    to.matched.some((item) => {
      if (!item.meta.title) return "";
      const siteTitle = siteConfig.SITE_TITLE;
      document.title = `${item.meta.title} - ${siteTitle}`;
    });
  }

  // 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面
  const toCorrectRoute = () => (WHITE_LIST.includes(to.fullPath) ? next(_from.fullPath) : next());

  console.log("from.path:", _from.path, " to.path:", to.path);

  if (userInfo) {
    if (_from?.name) {
      externalLink ? openLink(to?.name as string) : toCorrectRoute();
    } else {
      if (usePermissionStoreHook().wholeMenus.length === 0 && !["/login"].includes(to.path)) {
        initRouter().then(() => {
          const isInRouter = router.getRoutes().find((r) => r.path == to.path);
          if (!isInRouter) {
            router.push("/403");
          }
          if (isAllEmpty(to.name)) router.push(to.fullPath);
        });
      }
      toCorrectRoute();
    }
  } else {
    const isLoginPath = to.path === "/login";
    const isWhiteListed = WHITE_LIST.includes(to.path);
    if (isLoginPath || isWhiteListed) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});
