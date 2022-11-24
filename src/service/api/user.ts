import Request from '@/service';
import { tokenKey } from '@/common';
import localCache from '@/utils/localCache';
import { IDataModel } from '@/service/types/axios';
import { IAccount, ILoginResult } from '@/service/types/user';
import { User } from '.';

// 注册
export function register(data: IAccount): Promise<IDataModel> {
  return Request.request({
    url: User.USER,
    method: 'post',
    data
  });
}

// 登录
export function login(data: IAccount) {
  return Request.request<IDataModel<ILoginResult>>({
    url: User.LOGIN,
    method: 'POST',
    data,
    interceptors: {
      responseInterceptor: (res) => {
        const {
          code,
          data: { token }
        } = res;
        if (code === 0) {
          localCache.setCatch(tokenKey, token);
        }
        return res;
      }
    }
  });
}

// 获取用户信息
export function getUserInfo() {
  return Request.get({
    url: User.USER_OWN
  });
}

export function getUserMenu() {
  return Request.get({
    url: User.USEMENU
  });
}
