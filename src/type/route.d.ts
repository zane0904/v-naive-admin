import type { RouteMeta } from 'vue-router'
import { Expand } from '.'
import { Component } from './component'

interface MenuType {
  name: string
  path: string
  redirect?: string
  paramPath?: string
  disabled?: boolean
  children?: MenuType[]
  meta: RouteMeta
  component: Component | string
  components?: Component
}

interface permsType {
  name: string
  key: string
  id: number
  parentId: number
  state: number
  createDate: Date
  updateDate: Date
}
type RouteType = Expand<MenuType>
type PermsType = Expand<permsType>

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title: string
    keepAlive?: boolean
    hideMenu?: boolean
    roles?: Array<string>
    currentActiveMenu?: string // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
    hideTab?: boolean // 当前路由不再标签页显示
    transitionName?: string // 指定该路由切换的动画名
    iframeSrc?: string
    requiresAuth?: boolean
    orderNo?: number
  }
}
