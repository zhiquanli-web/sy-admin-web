import { RouteRecordRaw } from 'vue-router';
const formRoute: RouteRecordRaw[] = [
  {
    path: '/main/form',
    name: 'form',
    meta: {
      title: '表单',
      icon: 'Calendar',
      sort: 2
    },
    component: () => import('@/views/main/form/index.vue')
  }
];

export default formRoute;
