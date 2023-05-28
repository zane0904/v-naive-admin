<template>
  <div>Form</div>
</template>

<script lang="ts">
export default {
  setup() {
    const state = reactive({
      count: 0
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>
