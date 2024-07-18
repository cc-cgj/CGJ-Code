import axios from "axios";
import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { loading, loadingMessage } from ".";

import { message as Message } from "ant-design-vue";

import type { MessageArgsProps } from "ant-design-vue";

export type CustomConfig = {
  hideLoading?: boolean;
  hideMessage?: boolean;
  loadingText?: string;
  messageConfig?: {
    success: MessageArgsProps;
  };
};
export type RequestConfig<D = any> = AxiosRequestConfig<D> & CustomConfig;
export type InternalRequestConfig<D = any> = InternalAxiosRequestConfig<D> &
  CustomConfig;
export type Response<T = any, D = any> = AxiosResponse<T, D> & {
  config: RequestConfig;
};

function getEnvBaseURL(): string {
  // 本地
  let baseURL = import.meta.env.VITE_API_BASE_URL;
  const mode = import.meta.env.MODE;
  // 注意，开发环境是dev
  if (mode == "development") {
    baseURL = "/api/";
  }
  return baseURL;
}

const baseURL = getEnvBaseURL();

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: InternalRequestConfig) => {
    if (!config.hideLoading) {
      loadingMessage.value?.();
      loading.value = true;
      loadingMessage.value = Message.loading(
        config.loadingText || "加载中...",
        0
      );
    }
    // return new Promise((resolve) => setTimeout(() => resolve(config), 5000));
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: Response) => {
    return new Promise((resolve, reject) => {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      let hasOk = false,
        message = "请求失败";

      const { config } = response;
      const data = response.data;
      if (response.status == 200) {
        console.log(`请求成功`, response);
        hasOk = data?.hasOk;
        if (data.message) {
          message = data.message;
        }
        if (data?.hasOk == true) {
          resolve(data.data || data);
        }
      }
      setTimeout(() => {
        if (!config.hideLoading) {
          loading.value = false;
          loadingMessage.value?.();
        }
        const tip = { content: message, duration: 2 };
        if (!config.hideMessage) {
          if (hasOk) {
            Message.success(config?.messageConfig?.success || tip);
          } else {
            Message.error(tip);
          }
        }
      }, 50);

      // 错误处理
      if (!hasOk) {
        reject(data);
      }
    });
  },
  function (error) {
    loading.value = false;
    loadingMessage.value?.();
    console.log(`请求失败`, error, error.toJSON());
    // 取消接口
    if (error.code == "ERR_CANCELED") {
      Message.success(error.message);
      return;
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message.error(error.message);
    return Promise.reject(error);
  }
);

class Request {
  constructor() {}

  request() {
    instance;
  }

  post<R>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): AxiosResponse["data"] {
    return instance.post<R>(url, data, config);
  }
}

export default new Request();
