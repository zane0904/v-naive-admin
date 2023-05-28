// export interface IDictTypeAdd
export interface IDictTypeList {
  createDate: string
  updateDate: string
  id: number
  key: string
  value: string
  parentId?: number
  orderNo: number
}
export type IDictTypeAdd = Pick<IDictTypeList, 'key' | 'value' | 'orderNo'>
