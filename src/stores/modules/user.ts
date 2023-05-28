import { storePrefix } from '@/config'
import { defineStore } from 'pinia'
export const userProfileStore = defineStore({
  id: 'userProfileStore', //唯一
  state: () => ({
    token: '',
    userName: ''
  }),
  getters: {},
  actions: {},
  persist: {
    key: storePrefix + 'userProfileStore',
    storage: localStorage
  }
})
