/**
 * 本地跨域代理
 * @author LiuJia
 * @createTime 2024-05-08 14:47:37
 * @see https://cn.vitejs.dev/config/server-options.html#server-proxy
 */
export default {
  "/api": {
    target: "http://127.0.0.1:8201",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, "")
  }
};
