<script lang="tsx">
import { type DropdownOption } from 'naive-ui'
import useImg from '@/assets/images/user1.png'
import { userOptions } from './config'
import { userProfileStore } from '@stores/modules/user'
import OpenDrawer from './page/openDrawer.vue'
export default defineComponent({
  name: 'User',
  setup() {
    const { userName } = storeToRefs(userProfileStore())
    return () => (
      <>
        <div class={'mr-[14px] h-full flex items-center cursor-pointer'}>
          <NDropdown
            options={userOptions}
            class={'inp-out'}
            on-select={(key: string | number, option: DropdownOption) =>
              (option as any).fn(key, option)
            }
          >
            <div class={'flex justify-center items-center h-full'}>
              <img src={useImg} class={'w-[26px] h-[26px] rounded-full mr-[10px]'} />
              <span>{userName.value}</span>
            </div>
          </NDropdown>
          <OpenDrawer />
        </div>
      </>
    )
  }
})
</script>
