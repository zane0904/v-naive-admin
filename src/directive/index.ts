import type { App } from 'vue'
const modules = import.meta.globEager('./modules/**/*.ts')
/**
 * @remarks 自动注册全局指令
 **/
const installAllDirective = function (app: App<Element>) {
  Object.keys(modules).forEach(async item => {
    const default1 =
      (modules[item] as any).default || (modules[item] as any)[Object.keys(modules[item] as any)[0]]
    if (default1) {
      app.use(default1)
    } else {
      console.error(`注册失败: ${modules[item]}`)
    }
  })
}
export default installAllDirective
