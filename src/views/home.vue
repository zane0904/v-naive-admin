<template>
  <Content>
    首页
    <div v-if="hasPermission('key111111111111111111')">hooks</div>
    <div v-hasPermission="['key111111111111111111']">2222</div>
  </Content>
</template>
<script lang="ts" setup>
import { usePermissions } from '@/hooks/usePermission'

const { hasPermission } = usePermissions()
</script>
<style scoped></style>
