import Cookies from "js-cookie";
import { storageLocal } from "@pureadmin/utils";
import { AuthDataType } from "@/typings/auth";
import { useUserStoreHook } from "@/stores/modules/user";

/** 权限数据键名 */
export const AUTH_KEY = "baddog-auth-data";
/** `Token` 键名 */
export const TOKEN_KEY = "authorized-token";

/**
 * 格式化`Token`
 * @description 采用 `jwt` 格式
 */
export const formatToken = (token: string) => "Bearer " + token;

/** 获取 `Token` */
export const getToken = (): AuthDataType =>
  Cookies.get(TOKEN_KEY) ? JSON.parse(Cookies.get(TOKEN_KEY)) : storageLocal().getItem(AUTH_KEY);

/** 删除 `Token` */
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
  storageLocal().removeItem(AUTH_KEY);
};

/** 设置 `Token` */
export const setToken = (data: AuthDataType) => {
  const { accessToken, refreshToken, expires } = data;

  const cookieString = JSON.stringify({ accessToken, expires, refreshToken });

  expires > 0
    ? Cookies.set(TOKEN_KEY, cookieString, { expires })
    : Cookies.set(TOKEN_KEY, cookieString);

  let localUserName = storageLocal().getItem<AuthDataType>(AUTH_KEY)?.userName ?? "";
  let localNickName = storageLocal().getItem<AuthDataType>(AUTH_KEY)?.nickName ?? "";
  let localRoleId = storageLocal().getItem<AuthDataType>(AUTH_KEY)?.roleId ?? "";
  const { userName, nickName, roleId } = data ?? {};

  setAuthKey(
    userName ?? localUserName,
    nickName ?? localNickName,
    roleId ?? localRoleId,
    refreshToken,
    expires
  );
};

/** 设置认证信息 */
const setAuthKey = (
  userName: string,
  nickName: string,
  roleId: string,
  refreshToken: string,
  expires: number
) => {
  useUserStoreHook().setUserName(userName);
  useUserStoreHook().setNickName(nickName);
  useUserStoreHook().setRoleId(roleId);
  storageLocal().setItem(AUTH_KEY, {
    refreshToken,
    expires,
    userName,
    nickName,
    roleId
  });
};
