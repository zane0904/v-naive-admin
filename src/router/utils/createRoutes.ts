import { permissionMode } from '@/config'
import { RoleEnum } from '@/enum/route'
import { routeStore } from '@stores/modules/routeStore'
import type { RouteType } from '@/type/route'
import { RenderComponent, transformRoute } from '.'
import { router } from '..'
import { roleRoutesMap } from '../roleRoutes'
// 初始化路由防止路由刷新后页面404 这里是获取的旧路由信息进行挂载
export const createRoutes = () => {
  let roInfo: Array<RouteType> = []
  const store = routeStore()
  // @ts-ignore
  if (permissionMode === RoleEnum.MOVE || permissionMode === RoleEnum.BACK) {
    roInfo = transformRoute(store.routesList)
  } else {
    //角色
    const item = transformRoute(roleRoutesMap)
    if (item) {
      roInfo = store.routesList = item
    }
  }

  roInfo.forEach((item: RouteType) => {
    let routeName = item.name
    if (item.children?.length) {
      router.addRoute(item)
      store.routesName.push(item.name)
    } else {
      routeName = item.path + 'Parent'
      const view = {
        name: routeName,
        path: '',
        redirect: item.path, //重定向
        component: RenderComponent('view'),
        children: [item]
      }
      router.addRoute(view)
      store.routesName.push(view.name)
    }
  })
}
