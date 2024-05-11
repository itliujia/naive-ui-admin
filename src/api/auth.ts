import {
  LoginFormType,
  LoginResultType,
  RefreshTokenRequest,
  RefreshTokenResult,
  RouterResultType
} from "@/typings/auth";

import { http } from "@/utils/http";

/** 登录系统 */
export const loginApi = (data: LoginFormType) =>
  http.post<LoginResultType>("/api/auth/login", { data });

/** 获取路由 */
export const getRouterApi = () => http.post<RouterResultType>("/api/auth/getRouter");

/** 刷新Token */
export const refreshTokenApi = (data: RefreshTokenRequest) =>
  http.post<RefreshTokenResult>("/api/auth/refreshToken", { data });
