import { userProfileStore } from '@stores/modules/user'
import { type App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { staticRoutes } from './routes/basic'
import { afterEach } from './utils/afterEach'
import { beforeEach } from './utils/beforeEach'
import { mountNewData, mountRouter } from './utils/mountRouter'
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
  strict: true
})
export async function setRoute(app: App<Element>) {
  const { token } = storeToRefs(userProfileStore())
  if (unref(token)) {
    mountRouter()
  }
  app.use(router)
  if (unref(token)) {
    mountNewData()
  }
}
router.beforeEach(async (to, from, next) => beforeEach(to, from, next))
// 切换完成
router.afterEach(() => afterEach())
