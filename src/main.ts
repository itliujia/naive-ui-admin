import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { useNaiveui } from "@/plugins/naiveui";

import { router } from "@/router";

import { MotionPlugin } from "@vueuse/motion";

import importComponent from "@/components/comps";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/app.scss";

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";

const app = createApp(App);

// 注册全局组件
importComponent(app);
app.use(createPinia());
app.use(MotionPlugin);
app.use(router);
app.use(useNaiveui);
app.mount("#app");
