import axios, { type AxiosRequestConfig } from 'axios'
import { addPending } from './cancel'
/**
 * @remarks 新增取消方法，方便请求实例调用，并存储起来
 **/
export const addCancel = (request: AxiosRequestConfig) => {
  const cancelToken = axios.CancelToken
  let pendingObj: AxiosRequestConfig
  request.cancelToken = new cancelToken(c => {
    pendingObj = { ...request, cancelToken: c as any }
  })
  addPending(pendingObj!)
}
