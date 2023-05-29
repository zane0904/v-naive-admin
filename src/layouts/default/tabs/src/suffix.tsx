import Icon from '@/components/Icon/index.vue'
import { type DropdownOption } from 'naive-ui'
import useTabs from './utils'
import { configStore } from '@stores/modules/config'
import { themeStore } from '@stores/modules/theme'
export const Suffix = defineComponent({
  name: 'Suffix',
  setup() {
    const { rightFun, options, refreshRoute } = useTabs()
    const { isRefresh, prefix } = storeToRefs(configStore())
    const { showRefresh } = storeToRefs(themeStore())
    const className = ref(
      `w-[36px] h-full flex justify-center items-center cursor-pointer ${prefix.value}-tabs-extra-fn`
    )
    return () => (
      <div class={'h-full flex'}>
        {showRefresh.value ? (
          <div class={className.value} onClick={() => !isRefresh.value && refreshRoute()}>
            <NButton
              text
              loading={isRefresh.value}
              class={['hover', `${prefix.value}-button-Refresh`]}
              tag="div"
            >
              {isRefresh.value ? null : <Icon name={'shuaxin'} size={18} />}
            </NButton>
          </div>
        ) : null}

        <div class={[className.value, 'hover']}>
          <NDropdown
            options={options.value}
            trigger={'click'}
            onSelect={(key: string | number, option: DropdownOption) => {
              rightFun(key, option)
            }}
          >
            <Icon
              name={'xiangyou1'}
              class={['cursor-pointer', `${prefix.value}-dropdown-select`, 'hover']}
              style={{ transform: 'rotateZ(90deg)' }}
            />
          </NDropdown>
        </div>
      </div>
    )
  }
})
