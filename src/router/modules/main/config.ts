import { RouteRecordRaw } from 'vue-router';
const configRoute: RouteRecordRaw[] = [
  {
    path: '/main/config',
    name: 'config',
    meta: {
      title: '配置',
      icon: 'Setting',
      sort: 4
    },
    component: () => import('@/views/main/config/index.vue')
  }
];

export default configRoute;
