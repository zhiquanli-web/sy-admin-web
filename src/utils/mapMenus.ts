import mainStaticRoute from '@/router/modules';
import { useStore } from '@/store';

import { RouteRecord } from 'vue-router';

export async function mapMenusToRoutes(userMenus: any[]): Promise<RouteRecord[]> {
  const routes: any[] = [];
  // 加载所有菜单路由
  const allRoutes: RouteRecord[] = [];
  const routeFiles = import.meta.glob('../router/modules/main/*.ts');
  for (let key in routeFiles) {
    const route: any = await routeFiles[key]();
    allRoutes.push(...route.default);
  }
  // 根据权限菜单获取routes
  const _filterPermissionRoutes = (routes: any[]) => {
    if (!routes || routes.length === 0 || !userMenus || userMenus.length === 0) return [];
    const routeList = routes.filter((route) => {
      let curRoute: any = {};
      userMenus.forEach((menu) => {
        if (menu.path === route.path) {
          curRoute = route;
          if (route.children && route.children.length > 0) {
            route.children = _filterPermissionRoutes(route.children);
          }
        }
      });
      if (Object.keys(curRoute).length > 0) return true;
    });
    return routeList;
  };
  const permissionRoutes: any[] = _filterPermissionRoutes(allRoutes);
  // 静态路由(白名单路由) 与 权限路由 集合
  Object.assign(routes, [...mainStaticRoute, ...permissionRoutes]);
  routes.sort((a, b) => a.meta.sort - b.meta.sort);
  if (routes && routes.length > 0) {
    const store = useStore();
    store.user.firstMenuPath = routes[0].redirect ?? routes[0].path;
  }
  return routes;
}
