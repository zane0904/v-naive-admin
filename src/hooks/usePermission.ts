import { permissionMode } from '@/config'
import { RoleEnum } from '@/enum/route'
import { routeStore } from '@stores/modules/routeStore'
const permissionsMap = new Map()
export function usePermissions() {
  /**
   * @names 检查是否具有权限
   * @params value 限制 string || Array<string>
   * @return boolean
   * **/
  function hasPermission(value: string | string[]): boolean {
    if (!value) {
      return false
    }
    //   后端配置权限
    const { auth } = storeToRefs(routeStore())
    //   @ts-ignore
    if (permissionMode === RoleEnum.MOVE || permissionMode === RoleEnum.BACK) {
      const values = Array.isArray(value) ? value : [value]
      if (auth.value.length === 0) {
        return false
      }
      if (permissionsMap.size) {
        let next = false
        try {
          values.forEach(item => {
            if (permissionsMap.get(item)) {
              next = true
              throw new Error()
            }
          })
        } catch {
          //
        }
        return next
      }
      auth.value.forEach(item => permissionsMap.set(item.key, item))
      return hasPermission(value)
    }
    // 角色
    return false
  }
  return { hasPermission }
}
