/**
 * 是否为开发环境
 * @param {string} mode
 * @author LiuJia
 * @createTime 2024-05-08 14:41:41
 */
export const isDevFn = (mode: string): boolean => mode === "development";

/**
 * 是否为生产环境
 * @param {string} mode
 * @author LiuJia
 * @createTime 2024-05-08 14:41:41
 */
export const isProdFn = (mode: string): boolean => mode === "production";
