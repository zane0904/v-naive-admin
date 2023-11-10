import type { PendingType, RequestOptions } from '@/type/http'
import axios from 'axios'
import { addPending } from './cancel'
/**
 * @remarks 新增取消方法，方便请求实例调用，并存储起来
 **/
export const addCancel = (request: RequestOptions) => {
  const cancelToken = axios.CancelToken
  let pendingObj: PendingType
  request.cancelToken = new cancelToken(c => {
    pendingObj = { ...request, cancel: c }
  })
  addPending(pendingObj!)
}
