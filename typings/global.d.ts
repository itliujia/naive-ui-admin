/**
 * 全局类型声明
 */
declare global {
  /**
   * 构建信息
   */
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
    };
    lastBuildTime: string;
  };

  /**
   * 打包压缩格式的类型声明
   *
   * 可选模式：
   *  - `none`：不开启压缩，默认
   *  - 不删除原始文件
   *    - `gzip`
   *    - `brotli`
   *    - `both`：同时开启 gzip 与 brotli 压缩
   *  - 删除原始文件
   *    - `gzip-clear`
   *    - `brotli-clear`
   *    - `both-clear`：同时开启 gzip 与 brotli 压缩
   */
  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  /**
   * 全局自定义环境变量的类型声明
   */
  interface ViteEnv {
    /** 本地运行端口号 */
    VITE_PORT: number;
    /** 打包路径 */
    VITE_PUBLIC_PATH: string;
    /**
     * 路由历史模式
     *
     * 可选模式：
     * - `hash`：Hash 模式
     * - `h5`：HTML5模式
     */
    VITE_ROUTER_HISTORY: string;
    /** 文件压缩模式 */
    VITE_COMPRESSION: ViteCompression;
  }
}

export {};
