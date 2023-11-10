/// <reference types="vite/client" />
import { MessageApiInjection, DialogApiInjection, NotificationApiInjection } from 'naive-ui'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, {}, any>
  export default component
}
declare global {
  interface Window {
    $message: MessageApiInjection
    $useDialog: DialogApiInjection
    $useNotification: NotificationApiInjection
  }
}
