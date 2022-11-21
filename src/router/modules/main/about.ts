import type { RouteRecordRaw } from 'vue-router';

const aboutRoutes: RouteRecordRaw[] = [
  {
    path: '/main/about',
    name: 'about',
    redirect: '/main/about/first',
    meta: {
      title: '关于',
      icon: 'Folder',
      url: '/main/about',
      sort: 5
    },
    children: [
      {
        path: '/main/about/first',
        name: 'aboutFirst',
        component: () => import('@/views/main/about/first.vue'),
        meta: {
          title: '关于1-1',
          url: '/main/about/first',
          isHidden: true
        }
      },
      {
        path: '/main/about/secound',
        name: 'aboutSecound',
        component: () => import('@/views/main/about/secound.vue'),
        meta: {
          title: '关于1-2',
          url: '/main/about/secound'
        }
      }
    ]
  }
];
export default aboutRoutes;
