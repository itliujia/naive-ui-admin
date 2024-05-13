import { pathResolve } from "./tools";
import dayjs from "dayjs";
import { name, version, core } from "../package.json";

// 插件
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { PluginOption } from "vite";
import removeNoMatch from "vite-plugin-router-warn";
import compressPlugin from "./plugins/compress";
import removeConsole from "vite-plugin-remove-console";
import svgLoader from "vite-svg-loader";

/** 启动`node`进程时所在工作目录的绝对路径 */
const root: string = process.cwd();

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("../src"),
  "@build": pathResolve(),
  "@root": root
};

/** 构建信息 */
const __APP_INFO__ = {
  pkg: { name, version, core },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

/** 获取插件 */
const getVitePlugins = (isBuild: boolean, VITE_COMPRESSION: ViteCompression) => {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(), // jsx、tsx语法支持
    /**
     * 开发环境下移除非必要的vue-router动态路由警告No match found for location with path
     * 非必要具体看 https://github.com/vuejs/router/issues/521 和 https://github.com/vuejs/router/issues/359
     * vite-plugin-router-warn只在开发环境下启用，只处理vue-router文件并且只在服务启动或重启时运行一次，性能消耗可忽略不计
     */
    removeNoMatch(),
    svgLoader() // svg组件化支持
  ];

  if (isBuild) {
    vitePlugins.push(compressPlugin(VITE_COMPRESSION)); // 文件压缩
    vitePlugins.push(removeConsole()); // 线上环境删除console
  }

  return vitePlugins;
};

export { root, alias, __APP_INFO__, getVitePlugins };
