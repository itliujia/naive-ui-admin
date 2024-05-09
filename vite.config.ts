import { type UserConfig, type ConfigEnv, loadEnv } from "vite";

import proxy from "./build/proxy";
import { alias, root, __APP_INFO__, getVitePlugins } from "./build/vite";
import { pathResolve, warpperEnv } from "./build/tools";

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root);

  const viteEnv = warpperEnv(env);

  const isBuild = command === "build";

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_COMPRESSION } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    // 服务端渲染
    server: {
      port: VITE_PORT,
      host: true,
      proxy,
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"],
      },
    },
    // 插件
    plugins: getVitePlugins(isBuild, VITE_COMPRESSION),
    // 构建配置
    build: {
      // https://cn.vitejs.dev/guide/build.html#browser-compatibility
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("./index.html", import.meta.url),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
