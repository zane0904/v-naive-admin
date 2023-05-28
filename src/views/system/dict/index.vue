<template>
  <Content>
    <template v-slot:header> 字典管理 </template>
    <BasicTable @register="register">
      <template v-slot:toolbar>
        <NButton v-hasPermission="['system.menu.add']" type="info" @click="openModal()"
          >新增字典</NButton
        >
      </template>
    </BasicTable>
    <!-- <AddModal
      v-model:showModal="showModal"
      v-model:type="modelType"
      :info="editInfo"
      v-model:parentId="parentId"
      @refresh="methods.reload"
    /> -->
  </Content>
  <AddDrawer
    v-model:show="showModal"
    :parentId="parentId"
    :info="editInfo"
    v-model:type="modelType"
    @refresh="methods.reload"
  />
</template>
<script lang="tsx" setup>
import { APiSystem, Api } from '@/api/Api'
import { useHttp } from '@/hooks/useHttp'
import { DataTableColumns, useDialog } from 'naive-ui'
import AddDrawer from './src/addDrawer.vue'
import { createNotification } from '@/utils/message'
import { BasicTable, useTable } from '@/components/Table'
import { getDIctTypeList } from '@/api'
import { IDictTypeList } from './type'
const dialog = useDialog()
const showModal = ref(false)
const editInfo = ref<IDictTypeList | null>(null)
const modelType = ref<1 | 2 | 3 | 4>(1)
const parentId = ref<number>(0)
const del = (row: IDictTypeList) => {
  dialog.warning({
    title: '删除',
    content: '确定删除当前数据吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      const { run: sendDel, err: delUserErr } = useHttp({
        // 如果有 parentId 则认为是字典子类
        Api: row.parentId ? APiSystem.DictInfoDel + row.id : Api.ApiDelDictType + row.id, //DictInfoDel
        methods: 'delete'
      })
      await sendDel()
      if (!delUserErr.value) {
        createNotification({
          title: '成功',
          content: `删除字典${row.parentId ? '子类' : '类别'}成功`
        })
        // eslint-disable-next-line no-use-before-define
        methods.reload()
      }
    },
    onNegativeClick: () => {}
  })
}
const openModal = function () {
  showModal.value = true
  parentId.value = 0
  modelType.value = 1
}
const addBtn = (row: IDictTypeList) => {
  return (
    <NButton
      strong
      secondary
      type="success"
      v-hasPermission={['system.menu.add']}
      onclick={() => {
        modelType.value = 3
        showModal.value = true
        parentId.value = row.id!
      }}
    >
      新增
    </NButton>
  )
}
const editBtn = (row: IDictTypeList) => {
  return (
    <NButton
      v-hasPermission={['system.menu.edit']}
      strong
      secondary
      type="info"
      onClick={() => {
        editInfo.value = row
        showModal.value = true
        if (row.parentId) {
          modelType.value = 4
        } else {
          modelType.value = 2
        }
      }}
    >
      修改
    </NButton>
  )
}
const delBtn = (row: IDictTypeList) => {
  return (
    <NButton
      v-hasPermission={['system.menu.delete']}
      strong
      secondary
      type="error"
      onClick={() => del(row)}
    >
      删除
    </NButton>
  )
}
const columns: DataTableColumns<IDictTypeList> = [
  {
    title: 'id',
    key: 'id'
  },
  {
    title: 'key',
    key: 'key'
  },
  {
    title: 'value',
    key: 'value'
  },
  {
    title: '排序',
    key: 'orderNo',
    width: 80
  },
  {
    title: '创建时间',
    key: 'createDate'
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    render(row) {
      return (
        <div class="flex justify-between">
          {!row.parentId && addBtn(row)}
          {editBtn(row)}
          {delBtn(row)}
        </div>
      )
    }
  }
]
const { register, methods } = useTable({
  columns,
  // title: () => 'xxxx',
  api: getDIctTypeList,
  immediate: true,
  additionalParams: {},
  showIndexColumText: ' ',
  pageSetting: {
    // pageIndexField: '',
    // pageSizeField: '',
  },
  dataTableProps: {
    singleLine: false,
    rowKey: (row: IDictTypeList) => row.id || 0,
    size: 'medium',
    loading: false,
    bordered: true
  }
})
</script>

<style scoped></style>
