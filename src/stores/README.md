### pinia

# 推荐使用，比 vuex 舒服操作更方便，

# 官方文档 => https://pinia.vuejs.org/

# 数据持久化文档 => https://prazdevs.github.io/pinia-plugin-persistedstate/zh/

```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```
