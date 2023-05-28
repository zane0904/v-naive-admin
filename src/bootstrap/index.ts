import type { App } from 'vue'
import { setupPinia } from '@/stores'
import { setRoute } from '@/router'
import { setupI18n } from '@/locales'
import installAllDirective from '@/directive'
import '@/naive/index'

export const bootstrap = (app: App<Element>) => {
  setupPinia(app)
  setRoute(app)
  setupI18n(app)
  installAllDirective(app)

  app.mount('#app')
}
