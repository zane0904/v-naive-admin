import { permissionMode } from '@/config'
import { RoleEnum } from '@/enum/route'
import { routeStore } from '@stores/modules/routeStore'
import type { Component } from '@/type/component'
import type { RouteType } from '@/type/route'
import { DeepCopy } from '@utils'
import type { RouteLocationNormalized } from 'vue-router'
import { errSymbol, moveRoutersMap } from '../moveRoutes'
/**
 * @name 组件转换
 * @returns Vue Components
 **/
const files = import.meta.glob(['/src/views/**/*.vue'])
export const RenderComponent = (componentName: string): Component => {
  if (componentName === 'view') {
    return () => import(`@/layouts/default/view.vue`)
  } else if (componentName === 'iframe') {
    return () => import(`@/layouts/iframe/index.vue`)
  } else if (componentName === 'routerView') {
    return () => import(`@/layouts/routerView/index.vue`)
    // @ts-ignore
  } else if (permissionMode === RoleEnum.MOVE) {
    const item = moveRoutersMap.get(componentName)
    if (item) {
      return moveRoutersMap.get(componentName)
    }
    console.warn(`找不到${componentName}文件`)
    // 找不到时使用通用页面
    return moveRoutersMap.get(errSymbol)
    // @ts-ignore
  } else if (permissionMode === RoleEnum.BACK) {
    const component = files[`/src/views/${componentName}`]
    if (component) {
      return component
    }
    console.warn(`文件查找错误找不到${componentName}文件`)

    // return component // 后台返回数据
  }
  // @ts-ignore
  if (permissionMode === RoleEnum.ROLE) {
    return componentName
  }
}
export const transformRoute = (routeList: Array<RouteType>): Array<RouteType> => {
  const store = routeStore()
  return routeList
    .map((item: RouteType) => {
      // 处理路由权限
      // @ts-ignore
      if (permissionMode === RoleEnum.ROLE) {
        let next = false
        if (!item.meta.roles) {
          return
        }
        for (let i = 0; i < item.meta.roles.length; i++) {
          if (item.meta.roles[i] === '*' || store.role.includes(item.meta.roles[i])) {
            next = true
            break
          }
        }
        if (!next) {
          return
        }
      }
      const info = DeepCopy(item)
      info.component = RenderComponent(item.component)
      if (item.children) {
        info.children = transformRoute(item.children)
      }
      return info
    })
    .filter(i => i)
}
export const addTabs = (to: RouteLocationNormalized) => {
  const store = routeStore()
  const { name, path } = to
  if (store.tabs.filter(i => i.name === name && i.path === path).length === 0) {
    //不存在
    store.tabs.push({
      name: name as string,
      path: path,
      isClose: true,
      title: to.meta.title as string,
      query: to.query,
      params: to.params
    })
  }
}
