<script lang="tsx">
import Icon from '@/components/Icon/index.vue'
import { configStore } from '@stores/modules/config'
export default defineComponent({
  name: 'FixedSettings',
  setup() {
    const { openSettingDrawer } = storeToRefs(configStore())
    return () => (
      <>
        <div class="fixed right-0 z-10  top-1/2">
          <NButton type="warning" class="px-[10px] rounded-[6px]">
            <Icon
              name="setting2"
              class={'cursor-pointer'}
              size={20}
              onClick={() => (openSettingDrawer.value = true)}
            />
          </NButton>
        </div>
      </>
    )
  }
})
</script>
