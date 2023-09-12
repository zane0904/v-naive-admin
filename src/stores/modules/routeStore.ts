import { baseHome, storePrefix } from '@/config'
// import { removeRoute } from '@/router/utils/remove'
import type { PermsType, RouteType } from '@/type/route'
import { defineStore } from 'pinia'
import type { TabsType } from '../type/user'
import { userProfileStore } from './user'

export const routeStore = defineStore({
  id: 'routeStore',
  state: () => ({
    routesName: [] as Array<string>, //原数据
    routesList: [] as Array<RouteType>, // back路由模式接口数据
    auth: [] as Array<PermsType>, //权限
    selectMenu: baseHome, //首页路径
    tabs: <Array<TabsType>>[
      {
        name: baseHome,
        path: baseHome,
        isClose: false,
        title: '首页'
      }
    ],
    tabsActive: baseHome,
    role: ['admin', 'int']
  }),
  actions: {
    reset(callBack: () => void = () => {}) {
      return new Promise(async resolve => {
        const user = userProfileStore()
        // removeRoute()
        user.$reset()
        await callBack()
        setTimeout(() => {
          resolve(true)
          // this.$reset()
        }, 100)
      })
    }
  },
  persist: {
    key: storePrefix + 'routeStore',
    storage: localStorage,
    paths: ['auth', 'role', 'routesList']
  }
})
