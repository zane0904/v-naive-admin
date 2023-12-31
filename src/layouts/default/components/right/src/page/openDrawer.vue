<script lang="tsx">
import PageTheme from './PageTheme.vue'
import PageFun from './PageFun.vue'
import PageShow from './PageShow.vue'
import PageAnimation from './PageAnimation.vue'
import { themeStore } from '@stores/modules/theme'
import { colorFFF } from '@/config'
import { useClipboard } from '@vueuse/core'
import { createModal, createMsg } from '@/utils/message'
import { useOptions } from './copyOptions'
import { configStore } from '@stores/modules/config'
import { useLogOut } from '@/hooks/useLogin'
import { logError } from '@/utils/log'
export default defineComponent({
  name: 'OpenDrawer',
  emits: ['refCallBack'],
  setup() {
    // const active = ref<boolean>(false)
    const store = themeStore()
    const { openSettingDrawer } = storeToRefs(configStore())
    // onMounted(() => emit('refCallBack', { active }))
    const source = useOptions()
    const { copy, copied, isSupported } = useClipboard({ source })
    // 监听主题变化切换颜色
    watch(
      () => store.theme,
      state => {
        if (state) {
          store.$patch({
            headerColor: '#212121', //顶部颜色
            siderColor: '#24292e' //左侧菜单颜色
          })
        } else {
          store.$patch({
            headerColor: colorFFF, //顶部颜色
            siderColor: '#24292e' //左侧菜单颜色
          })
        }
      }
    )
    // 拷贝配置项
    watch(copied, () => {
      if (!isSupported) {
        createModal({
          type: 'error',
          title: '操作失败',
          content: '当前浏览器不支持 或 进制使用 剪切板API'
        })
        return false
      }
      if (copied.value) {
        createModal({
          type: 'success',
          title: '操作成功',
          content: '复制成功,请到 src/config/settings.ts 中修改配置！'
        })
      }
    })
    const clearAndReturnLoginPage = function () {
      const example = createModal({
        title: '温馨提示',
        type: 'warning',
        content: '是否清除当前所有配置并退出系统?',
        positiveText: '确定',
        negativeText: '取消',
        maskClosable: false,
        onPositiveClick: async () => {
          return new Promise(async resolve => {
            example.loading = true
            store.$reset()
            try {
              await useLogOut()
              const { openSettingDrawer } = storeToRefs(configStore())
              resolve(true)
              openSettingDrawer.value = false
            } catch (error) {
              logError(error as Error)
            }
          })
        }
      })
    }
    return () => (
      <>
        <NDrawer v-model:show={openSettingDrawer.value} width={'330px'}>
          <NDrawerContent
            closable={true}
            v-slots={{
              header: () => <div>项目配置</div>
            }}
          >
            <NDivider title-placement="center">主题</NDivider>
            <div class={'flex justify-center'}>
              <NSwitch
                size="medium"
                defaultValue={store.theme}
                onUpdateValue={v => (store.theme = v)}
                v-slots={{
                  icon: () => <div>🤔</div>
                }}
              ></NSwitch>
            </div>
            {/* 导航模式 / 主题颜色 */}
            <PageTheme />
            {/* 界面功能 */}
            <PageFun />
            {/* 界面显示 */}
            <PageShow />
            {/* 动画 */}
            <PageAnimation />
            <NDivider title-placement="center"></NDivider>
            <div class={'flex flex-col'}>
              <NButton
                type="primary"
                class={'mb-10px copy-btn'}
                onClick={() => copy()}
                disabled={copied.value}
              >
                拷贝
              </NButton>
              <NButton
                type="warning"
                class={'mb-10px'}
                onClick={() => {
                  store.$reset()
                  createMsg('重置成功', { type: 'success' })
                }}
              >
                重置
              </NButton>
              <NButton
                type="error"
                class={'mb-10px'}
                onClick={async () => clearAndReturnLoginPage()}
              >
                清空并返回登录页
              </NButton>
            </div>
          </NDrawerContent>
        </NDrawer>
      </>
    )
  }
})
</script>

<style lang="less" scoped></style>
