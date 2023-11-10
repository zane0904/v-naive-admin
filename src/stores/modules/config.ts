import { defineStore } from 'pinia'
export const configStore = defineStore({
  id: 'configStore',
  state: () => ({
    /**
     * 组件库前缀
     **/
    prefix: import.meta.env.VITE_APP_PREFIXCLS as string, //前缀
    /**
     * 是否正在刷新
     **/
    isRefresh: false,
    /**
     * 是否打开右侧配置项抽屉
     **/
    openSettingDrawer: false
  })
})
