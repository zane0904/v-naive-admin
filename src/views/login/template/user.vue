<script lang="tsx">
import { defineComponent } from 'vue'
import Register from './register.vue'
import UserNameLogin from '../src/components/userNameLogin.vue'
import type { IUserNameLogin, TargetContext } from '../src/type'
import { userRules } from '../src/config'
import UserName from '../src/components/userName.vue'
import PassWord from '../src/components/passWord.vue'
import PictureCode from '../src/components/pictureCode.vue'
import { userNameLogin } from '../src/hooks/loginFn'
export default defineComponent({
  name: 'User',
  components: {
    UserNameLogin,
    UserName,
    PassWord,
    PictureCode
  },
  setup() {
    const model = ref<TargetContext>('user')
    const ElRef = ref<Element>()
    const picRef = ref<Element>()
    const formValue: IUserNameLogin = reactive({
      userName: 'Admin',
      password: 'Admin123456',
      picCode: '',
      picId: ''
    })
    const { loading, loginGO } = userNameLogin(formValue)
    const form = () => (
      <>
        <h1 class="mb-[12px] text-[30px]">
          <b>登录</b>
        </h1>
        <NForm ref={ElRef} model={formValue} rules={userRules} label-placement="left">
          <UserName v-model:value={formValue.userName} />
          <PassWord v-model:value={formValue.password} />
          <PictureCode
            ref={picRef}
            v-model:value={formValue.picCode}
            v-model:picId={formValue.picId}
          />
        </NForm>
        <div class="flex justify-end">
          <NButton text tag="a" type="info">
            忘记密码?
          </NButton>
        </div>
        <br />
        <NButton
          type="info"
          loading={loading.value}
          class={'w-full mb-10px'}
          onClick={(e: MouseEvent) => {
            e.preventDefault()
            ;(ElRef.value as any).validate(async (errors: any) => {
              if (!errors) {
                const data: any = await loginGO()
                if (!data) {
                  ;(picRef.value as any).run()
                  formValue.picCode = ''
                }
              }
            })
          }}
        >
          登录
        </NButton>
        <div class={'flex justify-between'}>
          {/* <NButton class={'w-1/3'} onClick={() => (model.value = 'phone')}>
            手机号登录
          </NButton> */}
          <NButton class={'w-1/3'} onClick={() => (model.value = 'register')}>
            注册
          </NButton>
        </div>
      </>
    )
    return () => (
      <>
        {(() => {
          switch (model.value) {
            case 'user':
              return form()
            case 'register':
              return <Register onGx={(val: TargetContext) => (model.value = val)} />
            default:
              return null
          }
        })()}
      </>
    )
  }
})
</script>
