import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readdir, stat } from "node:fs";

/**
 * 路径解析
 * @param {string} dir 目标目录
 * @param {string} metaUrl 当前文件路径
 * @author LiuJia
 * @createTime 2024-05-08 14:56:34
 */
export function pathResolve(
  dir: string = ".",
  metaUrl: string = import.meta.url
) {
  const currentFileDir = dirname(fileURLToPath(metaUrl));
  const buildDir = resolve(currentFileDir, "build");
  const resolvedPath = resolve(currentFileDir, dir);
  if (resolvedPath.startsWith(buildDir)) {
    return fileURLToPath(metaUrl);
  }
  return resolvedPath;
}

/** 处理环境变量 */
export const warpperEnv = (envConf: Recordable): ViteEnv => {
  /** 默认值 */
  const defaultEnv: ViteEnv = {
    VITE_PORT: 8866,
    VITE_PUBLIC_PATH: "/",
    VITE_ROUTER_HISTORY: "",
    VITE_COMPRESSION: "none",
  };

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    defaultEnv[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }

  return defaultEnv;
};
