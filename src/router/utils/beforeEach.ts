import { baseHome, noAddTabs } from '@/config'
import { themeStore } from '@stores/modules/theme'
import { userProfileStore } from '@stores/modules/user'
import { NProgressStart } from '@utils/NProgress'
import { type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { addTabs } from '.'

export const beforeEach = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const useStore = userProfileStore()
  if (to.path !== '/login' && !useStore.token) {
    const query = { redirectPath: to.path }
    next({
      path: '/login',
      query: to.path === '/404' || !to.path ? {} : query
    })
  }
  if (!noAddTabs.includes(to.name as string) && !to.meta.hideTab) {
    addTabs(to)
  }
  nextTick(() => {
    const title = useTitle()
    title.value = (to.meta.title || 'App') + ' - ' + import.meta.env.VITE_APP_TITLE
  })
  const store = themeStore()
  if (store.progressBar) {
    NProgressStart()
  }
  // 登录后禁止手动跳转到login 必须要点击退出按钮 清空token
  if (to.path === '/login' && useStore.token) {
    next(baseHome)
  } else {
    next()
  }
}
