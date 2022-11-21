import type { PropType } from 'vue';
import type { RouteRecord } from 'vue-router';
import { defineStore } from 'pinia';
import { tokenKey } from '@/common';
import { login, getUserInfo } from '@/service/api/user';
import { IAccount } from '@/service/types/user';
import localCache from '@/utils/localCache';
import router from '@/router';
import { mapMenusToRoutes } from '@/utils/mapMenus';

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: { username: 'admin', avatar: '' },
      userMenus: [] as PropType<RouteRecord[]>,
      firstMenuPath: ''
    };
  },
  actions: {
    async loginAction(params: IAccount) {
      try {
        const {
          code,
          data: { token },
          message
        } = await login(params);
        if (code === 0) {
          localCache.setCatch(tokenKey, token);
          this.token = token;
          // await this.changeUserInfo();
          await this.changeUserMenus();
          router.push('/');
        }
      } catch (error) {
        return error;
      }
    },
    async changeUserMenus() {
      try {
        // const menus = await getUserMenu();
        const routes = await mapMenusToRoutes();
        this.userMenus = routes as any[];
        routes.length > 0 &&
          routes.forEach((route: any) => {
            router.addRoute('main', route);
          });
      } catch (error) {
        return error;
      }
    },
    async changeUserInfo() {
      try {
        const { code, data } = await getUserInfo();
        if (code === 0) {
          this.userInfo = data;
        }
      } catch (error) {
        return error;
      }
    },
    async loadLocalLogin() {
      const token = localCache.getCache(tokenKey);
      if (!token) return;
      await this.changeUserMenus();
      // await this.changeUserInfo();
    }
  }
});

export default useUserStore;
