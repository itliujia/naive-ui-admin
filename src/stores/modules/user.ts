import {
  LoginFormType,
  LoginResultType,
  RefreshTokenRequest,
  RefreshTokenResult
} from "@/typings/auth";
import { AUTH_KEY, setToken, removeToken } from "@/utils/auth";
import { storageLocal } from "@pureadmin/utils";
import { defineStore } from "pinia";
import { store } from "../index";
import { loginApi, refreshTokenApi } from "@/api/auth";
import { showMessage } from "@/utils/discreteApi";
import siteConfig from "@build/settings/site";
import { router } from "@/router";

/** 网站用户类型定义 */
export type WebUserType = {
  /** 用户账号 */
  userName?: string;
  /** 用户昵称 */
  nickName?: string;
  /** 角色ID */
  roleId?: string;
};

export const useUserStore = defineStore({
  id: "baddog-user",
  state: (): WebUserType => ({
    userName: storageLocal().getItem<WebUserType>(AUTH_KEY)?.userName ?? "",
    nickName: storageLocal().getItem<WebUserType>(AUTH_KEY)?.nickName ?? "",
    roleId: storageLocal().getItem<WebUserType>(AUTH_KEY)?.roleId ?? ""
  }),
  actions: {
    /** 存储用户名 */
    setUserName(userName: string) {
      this.userName = userName;
    },
    /** 存储用户昵称 */
    setNickName(nickName: string) {
      this.nickName = nickName;
    },
    /** 存储角色ID */
    setRoleId(roleId: string) {
      this.roleId = roleId;
    },
    reset() {
      this.userName = "";
      this.nickName = "";
      this.roleId = "";
    },
    /** 刷新`token` */
    async handRefreshToken(data: RefreshTokenRequest) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then((res) => {
            if (res) {
              setToken(res.data);
              resolve(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /** 登入系统 */
    async login(loginForm: LoginFormType) {
      return new Promise<LoginResultType>((resolve, reject) => {
        loginApi(loginForm)
          .then((res) => {
            if (res.code == siteConfig.SUCCESS_CODE) {
              setToken(res.data);
              resolve(res);
            } else {
              showMessage(res.msg, { type: "error" });
              reject(res.msg);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /** 退出登录 */
    logOut() {
      this.reset();
      removeToken();
      router.push("/login");
    }
  }
});

export const useUserStoreHook = () => useUserStore(store);
