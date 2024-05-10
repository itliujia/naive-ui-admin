import { App } from "vue";

import { BdIcon, BdMotion } from "@/components/BdComps";

/** 注册全局组件 */
export default (app: App<Element>) => {
  app.component("BdIcon", BdIcon);
  app.component("BdMotion", BdMotion);
};

/** 全局注册类型声明 */
declare module "vue" {
  export interface GlobalComponents {
    BdIcon: typeof import("@/components/BdComps")["BdIcon"];
    BdMotion: typeof import("@/components/BdComps")["BdMotion"];
  }
}
