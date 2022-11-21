import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });
import { tokenKey } from '@/common';
import localCache from '@/utils/localCache';

import dashboardRoute from './modules';
import { useStore } from '@/store';

interface IMeta extends RouteMeta {
  isHidden: boolean;
}

export interface RouterItem {
  path: string;
  component: any;
  meta: IMeta;
  name?: string;
  redirect?: string;
  children?: RouterItem[];
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/index.vue'),
    children: [...dashboardRoute]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = localCache.getCache(tokenKey);
  const isToLogin = to.path === '/login';
  if (token) {
    if (isToLogin) {
      next({ path: '/' });
    } else if (to.path === '/main') {
      const store = useStore();
      next({ path: store.user.firstMenuPath });
    } else {
      next();
    }
  } else {
    if (!isToLogin) {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
