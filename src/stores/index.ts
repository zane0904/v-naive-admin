import { type App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export const setupPinia = (app: App<Element>) => {
  app.use(createPinia().use(piniaPluginPersistedstate))
  console.log(
    '%c[Pinia] devtools support enabled %c read more at https://pinia.vuejs.org/',
    'background:#0ea5e9; color:white; padding: 1px 4px; border-radius: 3px;font-size:12px',
    ''
  )
}
