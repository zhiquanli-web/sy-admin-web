import type { AxiosRequestConfig } from 'axios';
import IRequest from './request';
import localCache from '@/utils/localCache';

import { tokenKey } from '@/common';
import { useMessage } from '@/hooks';

const TIMEOUT = 5000;

const Request = new IRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      const token = localCache.getCache(tokenKey);
      if (token) {
        config.headers!.Authorization = token;
      }
      return config;
    },
    responseInterceptorCatch: (res) => {
      const { error } = useMessage();
      error(res.response.data.data || '请求错误');
      return res;
    }
  }
});

export default Request;
