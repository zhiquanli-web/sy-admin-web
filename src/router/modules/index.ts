import type { RouteRecordRaw } from 'vue-router';

const dashboardRoute: RouteRecordRaw[] = [
  {
    path: '/main/dashboard',
    name: 'dashboard',
    meta: { title: '首页', icon: 'HomeFilled', sort: 1 },
    component: () => import('@/views/main/dashboard/index.vue')
  }
];

export default dashboardRoute;
