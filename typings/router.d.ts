// 全局路由类型声明

import type { RouteComponent, RouteLocationNormalized } from "vue-router";
import type { FunctionalComponent } from "vue";

declare global {
  interface ToRouteType extends RouteLocationNormalized {
    meta: CustomizeRouteMeta;
  }

  /**
   * @description 完整子路由的`meta`配置表
   */
  interface CustomizeRouteMeta {
    /** 菜单名称 `必填` */
    title: string;
    /** 菜单图标 `可选` */
    icon?: string | FunctionalComponent | IconifyIcon;
    /** 是否在菜单中显示（默认`true`）`可选` */
    showLink?: boolean;
  }

  /**
   * @description 完整子路由配置表
   */
  interface RouteChildrenConfigsTable {
    /** 子路由地址 `必填` */
    path: string;
    /** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
    name?: string;
    /** 路由重定向 `可选` */
    redirect?: string;
    /** 按需加载组件 `可选` */
    component?: RouteComponent;
    meta?: CustomizeRouteMeta;
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>;
  }

  /**
   * @description 整体路由配置表（包括完整子路由）
   */
  interface RouteConfigsTable {
    /** 路由地址 `必填` */
    path: string;
    /** 路由名字（保持唯一）`可选` */
    name?: string;
    /** `Layout`组件 `可选` */
    component?: RouteComponent;
    /** 路由重定向 `可选` */
    redirect?: string;
    meta?: {
      /** 菜单名称`必填` */
      title: string;
      /** 菜单图标 `可选` */
      icon?: string | FunctionalComponent | IconifyIcon;
      /** 是否在菜单中显示（默认`true`）`可选` */
      showLink?: boolean;
      /** 菜单升序排序，值越高排的越后`可选` */
      rank?: number;
    };
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>;
  }
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module "vue-router" {
  interface RouteMeta extends CustomizeRouteMeta {}
}
