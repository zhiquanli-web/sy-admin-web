import { RouteRecordRaw } from 'vue-router';
const userRoutes: RouteRecordRaw[] = [
  {
    path: '/main/user',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'UserFilled',
      sort: 3
    },
    component: () => import('@/views/main/user/index.vue')
  }
];

export default userRoutes;
