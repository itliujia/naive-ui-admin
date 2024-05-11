import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface CustomHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface CustomHttpResponse extends AxiosResponse {
  config: CustomHttpRequestConfig & { headers: AxiosRequestHeaders };
}

export interface CustomHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: CustomHttpRequestConfig) => void;
  beforeResponseCallback?: (response: CustomHttpResponse) => void;
}
