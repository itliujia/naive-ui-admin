import { ResultDataType, ResultListType } from "./result";

/** 登录表单类型定义 */
export interface LoginFormType {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}

export interface TokenType {
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间 */
  expires: number;
}

/** 权限数据类型定义 */
export type AuthDataType = {
  /** 用户名 */
  userName?: string;
  /** 昵称 */
  nickName?: string;
  /** 角色ID */
  roleId?: string;
} & TokenType;

export interface RefreshTokenRequest {
  /** 刷新 `Token` */
  refreshToken: string;
}

/** 刷新 `Token` 结果 */
export type RefreshTokenResult = ResultDataType<TokenType>;

/** 登录结果类型定义 */
export interface LoginResult {}

/** 登录结果类型定义 */
export type LoginResultType = ResultDataType<AuthDataType>;

/** 获取路由结果 */
export type RouterResultType = ResultListType<AuthDataType>;
