import type { App, Component } from "vue";
import {
  NAvatar,
  NInput,
  NForm,
  NFormItem,
  NIcon,
  NButton,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NDivider,
  NDropdown,
  NTooltip
} from "naive-ui";

const components = [
  NAvatar,
  NInput,
  NForm,
  NFormItem,
  NIcon,
  NButton,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NDivider,
  NDropdown,
  NTooltip
];

const plugins = [];

/** 按需引入`naiveui` */
export function useNaiveui(app: App) {
  // 全局注册组件
  components.forEach((component: Component) => {
    const componentName = "N" + component.name;
    app.component(componentName, component);
  });

  // 全局注册插件
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
