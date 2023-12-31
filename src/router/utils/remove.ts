import { routeStore } from '@stores/modules/routeStore'
import { router } from '..'
export const removeRoute = () => {
  const store = routeStore()
  store.routesName.forEach(item => router.removeRoute(item))
  store.$patch({
    routesName: [],
    routesList: []
  })
}
