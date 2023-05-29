<template>
  <NDrawer :show="props.show" @update-show="updateShow" :width="400">
    <NDrawerContent :title="props.type === 1 || props.type === 3 ? '新增' : '修改'">
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-align="left"
        label-width="80"
      >
        <n-form-item :span="24" label="key" path="key">
          <NInput v-model:value="model.key" placeholder="请输入字典key" />
        </n-form-item>
        <n-form-item :span="24" label="value" path="value">
          <NInput v-model:value="model.value" placeholder="请输入字典value" />
        </n-form-item>
        <n-form-item :span="6" label="排序" path="orderNo">
          <NInputNumber v-model:value="model.orderNo" placeholder="排序号" :min="1" :max="9999" />
        </n-form-item>
      </n-form>
      <template v-slot:footer>
        <NButton :loading="loading">取消</NButton>
        <NButton type="info" :loading="loading" @click="subMit">确定</NButton>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<script lang="ts" setup>
import { type FormInst, type FormRules } from 'naive-ui'
import { type IDictTypeAdd, type IDictTypeList } from '../type'
import { useHttp } from '@/hooks/useHttp'
import { APiSystem } from '@/api/Api'
import { createNotification } from '@/utils/message'
import { type Method } from 'axios'
const loading = ref<boolean>(false)
const rules: FormRules = {
  key: {
    required: true,
    message: 'key字段必填项',
    trigger: ['blur', 'input']
  },
  value: {
    required: true,
    message: 'value字段必填项',
    trigger: ['blur', 'input']
  },
  orderNo: {
    type: 'number',
    required: true,
    message: '请设置字典顺序',
    trigger: ['input', 'blur']
  }
}
const initialState = {
  key: '',
  value: '',
  orderNo: 1
}
const model = reactive<IDictTypeAdd>({
  ...initialState
})
const formRef = ref<FormInst | null>(null)
const props = withDefaults(
  defineProps<{
    show: boolean
    type: 1 | 2 | 3 | 4 // 1:类别新增 2:类别修改 3:类别子类新增 4: 类别子类修改
    parentId: number
    info?: IDictTypeList | null
  }>(),
  {
    show: false
  }
)
const emits = defineEmits(['update:show', 'update:parentId', 'refresh', 'update:type'])
const close = function close() {
  Object.assign(model, initialState)
  console.log(111)
  emits('update:show', false)
  emits('update:parentId', 0)
  emits('update:type', 1)
}
const updateShow = function updateShow(state: boolean) {
  if (!state) {
    // emits('update:show', state)
    close()
  }
}
const send = async function send(
  api: string,
  methods: Method,
  data: Record<string, any>,
  content: string
) {
  const { run, err } = useHttp({
    Api: api,
    methods,
    data
  })
  loading.value = true
  await run()
  loading.value = false
  if (!err.value) {
    createNotification({
      title: '成功',
      content
    })
    close()
    emits('refresh')
  }
}
// 字典类新增
const typeAdd = async function typeAdd() {
  send(APiSystem.DictAddType, 'post', model, '新增字典成功')
  // const { run, err } = useHttp({
  //   Api: APiSystem.DictAddType,
  //   methods: 'post',
  //   data: model,
  // })
  // loading.value = true
  // await run()
  // loading.value = false
  // if (!err.value) {
  //   createNotification({
  //     title: '成功',
  //     content: '新增字典成功',
  //   })
  //   close()
  //   emits('refresh')
  // }
}
// 字典类修改
const typeEdit = function typeEdit() {
  send(APiSystem.DictEditType, 'patch', { ...model, id: props.info!.id }, '修改字典成功')
}
// 字典详情新增
const typeInfoAdd = function typeInfoAdd() {
  send(APiSystem.DictInfoAdd + props.parentId, 'post', model, '新增字典子类成功')
}
// 字典详情修改
const typeInfoEdit = function typeInfoEdit() {
  send(APiSystem.DictInfoUpdate, 'patch', { ...model, id: props.info?.id }, '修改字典子类成功')
}
const subMit = function subMit() {
  formRef.value?.validate(async errors => {
    if (!errors) {
      switch (props.type) {
        case 1:
          typeAdd()
          break
        case 2:
          typeEdit()
          break
        case 3:
          typeInfoAdd()
          break
        case 4:
          typeInfoEdit()
          break
        default:
          console.warn('未正确匹配字典类型请检查数据')
          break
      }
    }
  })
}
watch(
  () => props.type,
  (val: number) => {
    if (val === 2 || val === 4) {
      const { key, value, orderNo } = props.info!
      Object.assign(model, { key, value, orderNo })
    }
  }
)
</script>
