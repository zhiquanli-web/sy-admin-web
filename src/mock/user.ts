import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

import { User } from '@/service/api';
import { ILoginResult } from '@/service/types/user';

const loginRes: ILoginResult = Mock.mock({
  'token|64': /[a-zA-Z0-9]/,
  'id|12': /[0-9]/,
  username: 'admin'
});

const userInfo = {
  username: 'admin',
  avatar: ''
};

const useMenuData = [
  {
    id: 1,
    path: '/main/about'
  },
  {
    id: 2,
    path: '/main/about/first'
  },
  {
    id: 3,
    path: '/main/about/secound'
  },
  {
    id: 4,
    path: '/main/config'
  },
  {
    id: 5,
    path: '/main/form'
  },
  {
    id: 6,
    path: '/main/table'
  }
];

export default [
  {
    // 登录
    url: `/api${User.LOGIN}`,
    method: 'post',
    response: ({ body }: any) => {
      console.log(`POST::${User.LOGIN}`, body);
      return {
        code: 0,
        data: loginRes,
        message: 'success'
      };
    }
  },
  {
    // 获取用户信息
    url: `/api${User.USER}`,
    method: 'get',
    response: () => {
      console.log(`GET::${User.USER}`);
      return {
        code: 0,
        data: userInfo,
        message: 'success'
      };
    }
  },
  {
    // 注册
    url: `/api${User.USER}`,
    method: 'post',
    response: () => {
      console.log(`GET::${User.USER}`);
      return {
        code: 0,
        data: '注册成功',
        message: 'success'
      };
    }
  },
  {
    // 获取菜单数据
    url: `/api${User.USEMENU}`,
    method: 'get',
    response: () => {
      console.log(`GET::${User.USEMENU}`);
      return {
        code: 0,
        data: useMenuData,
        message: 'success'
      };
    }
  }
] as MockMethod[];
