<script lang="tsx">
import { ColorSelect, PageLayout } from '../../../settings'
import { themeColor, headerColor, siderColor } from '@/config'
import { themeStore } from '@stores/modules/theme'
export default defineComponent({
  name: 'PageTheme',
  setup() {
    const store = themeStore()
    return () => (
      <>
        <NDivider title-placement="center">导航栏模式</NDivider>
        <PageLayout />
        <NDivider title-placement="center">系统主题</NDivider>
        <ColorSelect colorList={themeColor as any} v-model:model={store.themeColor} />
        <NDivider title-placement="center">顶栏主题</NDivider>
        <ColorSelect colorList={headerColor as any} v-model:model={store.headerColor} />
        <NDivider title-placement="center">菜单主题</NDivider>
        <ColorSelect colorList={siderColor as any} v-model:model={store.siderColor} />
      </>
    )
  }
})
</script>

<style lang="less" scoped></style>
