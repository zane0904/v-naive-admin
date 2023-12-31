import { routeStore } from '@stores/modules/routeStore'
import { type TabsType } from '@stores/type/user'
import { router } from '@/router'
import { type DropdownOption } from 'naive-ui'
import { computed, reactive } from 'vue'
import { renderIcon } from '../config'
import { TabsEmnu } from '@/config'
export default function useTabs() {
  const store = routeStore()
  const tabFun = reactive({
    closeOwn: false, //关闭自己
    closeAll: false, //关闭全部
    closeLeft: false, //关闭左侧
    closeRight: false, //关闭右侧
    closeOther: false //关闭其他
  })
  const options = computed(() => {
    return [
      {
        label: TabsEmnu.refresh,
        key: TabsEmnu.refresh,
        icon: renderIcon('shuaxin')
      },
      {
        label: TabsEmnu.closeTab,
        key: TabsEmnu.closeTab,
        icon: renderIcon('guanbi'),
        disabled: tabFun.closeOwn
      },
      {
        label: TabsEmnu.closeLeft,
        key: TabsEmnu.closeLeft,
        icon: renderIcon('zuoce'),
        disabled: tabFun.closeLeft
      },
      {
        label: TabsEmnu.closeRight,
        key: TabsEmnu.closeRight,
        icon: renderIcon('youce'),
        disabled: tabFun.closeRight
      },
      {
        label: TabsEmnu.closeOther,
        key: TabsEmnu.closeOther,
        icon: renderIcon('qitacaidan'),
        disabled: tabFun.closeOther
      },
      {
        label: TabsEmnu.closeAll,
        key: TabsEmnu.closeAll,
        icon: renderIcon('quanbu'),
        disabled: tabFun.closeAll
      }
    ]
  })
  // 关闭当前
  const closeTabs = (item: TabsType) => {
    if (!item.isClose) {
      return false
    }
    const index = store.tabs.findIndex(
      i => i.name === item.name && i.path === item.path && i.title === item.title
    )
    if (item.path === store.selectMenu) {
      router.push(store.tabs[index - 1].path)
    }
    store.tabs.splice(index, 1)
  }
  const refreshRoute = () => router.push(`/redirect${router.currentRoute.value.path}`)
  // 关闭全部 OK
  const deleteAll = () => {
    if (store.tabs.filter(i => i.path === store.selectMenu)[0].isClose) {
      router.push(store.tabs[0].path)
    }
    store.tabs = store.tabs.filter(i => !i.isClose)
  }
  // 关闭其他
  const deleteOther = () => {
    store.tabs = store.tabs.filter(i => i.path === store.selectMenu || !i.isClose)
  }
  // 关闭左侧
  const deleteLeft = () => {
    const index = store.tabs.findIndex(i => i.path === store.selectMenu)
    const saveNoClose = store.tabs.slice(0, index).filter(i => !i.isClose)
    store.tabs.splice(0, index, ...saveNoClose)
  }
  // 关闭右侧
  const deleteRight = () => {
    const index = store.tabs.findIndex(i => i.path === store.selectMenu)
    const saveNoClose = store.tabs.slice(index + 1, store.tabs.length - 1).filter(i => !i.isClose)
    store.tabs.splice(index + 1, store.tabs.length - 1, ...saveNoClose)
  }
  const rightFun = (key: string | number, option: DropdownOption) => {
    // 右侧下拉功能
    switch (option.label) {
      case TabsEmnu.refresh: //刷新加载
        refreshRoute()
        break
      case TabsEmnu.closeTab:
        closeTabs(store.tabs.filter(i => store.selectMenu === i.path)[0])
        break
      case TabsEmnu.closeLeft:
        deleteLeft()
        break
      case TabsEmnu.closeRight:
        deleteRight()
        break
      case TabsEmnu.closeOther:
        deleteOther()
        break
      case TabsEmnu.closeAll:
        deleteAll()
        break
      default:
        break
    }
  }
  return {
    closeTabs,
    refreshRoute,
    deleteAll,
    deleteOther,
    deleteLeft,
    deleteRight,
    rightFun,
    tabFun,
    options
  }
}
