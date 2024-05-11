import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer
} from "axios";
import { stringify } from "qs";
import { useUserStoreHook } from "@/stores/modules/user";
import {
  CustomHttpError,
  CustomHttpRequestConfig,
  CustomHttpResponse,
  RequestMethods
} from "./typings";
import { timestampToTime } from "@/utils/time";
import { showMessage } from "@/utils/discreteApi";
import { getToken, formatToken } from "@/utils/auth";

/** 默认配置 */
const DEFAULT_CONFIG: AxiosRequestConfig = {
  /** 请求超时时间 */
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

/**
 * 请求白名单
 *
 * 放置一些不需要token的接口
 *
 * @description 通过设置请求白名单，防止token过期后再请求造成的死循环问题
 */
const WHITE_LIST = ["/refreshToken", "/login"];

/** 响应错误码 */
const RESPONSE_ERROR = {
  404: "接口不存在",
  500: "服务器异常",
  503: "接口无权限"
};

const ERROR_CODES = Object.keys(RESPONSE_ERROR).map(Number);

/** 自定义 `Http` 类 */
class CustomHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新`token` */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: CustomHttpRequestConfig = {};

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(DEFAULT_CONFIG);

  /** 重连原始请求 */
  private static retryOriginalRequest(config: CustomHttpRequestConfig) {
    return new Promise((resolve) => {
      CustomHttp.requests.push((token: string) => {
        config.headers["Authorization"] = formatToken(token);
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    const instance = CustomHttp.axiosInstance.interceptors.request;
    instance.use(
      async (config: CustomHttpRequestConfig): Promise<any> => {
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }

        if (CustomHttp.initConfig.beforeRequestCallback) {
          CustomHttp.initConfig.beforeRequestCallback(config);
          return config;
        }

        /** 是否为白名单地址 */
        const isWhiteUrl = WHITE_LIST.some((url) => config.url.endsWith(url));
        if (isWhiteUrl) {
          return config;
        }

        return new Promise((resolve, reject) => {
          const tokenData = getToken();

          if (tokenData) {
            const nowTime = new Date().getTime();
            /** `token`是否过期 */
            const isExpired = Number(tokenData.expires) - nowTime <= 0;
            if (isExpired) {
              if (!CustomHttp.isRefreshing) {
                CustomHttp.isRefreshing = true;
                // token过期刷新
                useUserStoreHook()
                  .handRefreshToken({ refreshToken: tokenData.refreshToken })
                  .then((res) => {
                    const token = res.data.accessToken;
                    config.headers["Authorization"] = formatToken(token);
                    CustomHttp.requests.forEach((cb) => cb(token));
                    CustomHttp.requests = [];
                  })
                  .finally(() => {
                    CustomHttp.isRefreshing = false;
                  });
              }
              resolve(CustomHttp.retryOriginalRequest(config));
            } else {
              config.headers["Authorization"] = formatToken(tokenData.accessToken);
              resolve(config);
            }
          } else {
            resolve(config);
          }
        });
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = CustomHttp.axiosInstance.interceptors.response;
    instance.use(
      (response: CustomHttpResponse) => {
        const $config = response.config;
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (CustomHttp.initConfig.beforeResponseCallback) {
          CustomHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (error: CustomHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: CustomHttpRequestConfig
  ): Promise<T> {
    // 加入时间戳防止请求缓存
    const t = timestampToTime(-1, "timestr");
    const config = {
      method,
      url: url + `?t=${t}`,
      ...param,
      ...axiosConfig
    } as CustomHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      CustomHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch((error) => {
          const status: number | undefined = error?.response?.status;
          if (status == 401) {
            useUserStoreHook().logOut();
            showMessage("请先登录", { type: "error" });
          } else if (ERROR_CODES.includes(status)) {
            showMessage(RESPONSE_ERROR[status], { type: "error" });
          } else {
            showMessage(error.message || "请求失败", { type: "error" });
          }
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<P>(
    url: string,
    params?: AxiosRequestConfig,
    config?: CustomHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, config);
  }

  /** 单独抽离的get工具函数 */
  public get<P>(
    url: string,
    params?: AxiosRequestConfig,
    config?: CustomHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, params, config);
  }
}

export const http = new CustomHttp();
