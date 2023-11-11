// import type { PendingType } from '@/type/http'
import type { SetOptional } from '@/type'
import type { cancelRequest } from '@/type/http'
import type { AxiosRequestConfig } from 'axios'

/**
  @remarks axiosRequestMap
  @remarks 所有请求在此进行暂存
**/
export const axiosRequestMap: Map<string, AxiosRequestConfig> = new Map()
/**
  @remarks cancelRequestMap
  @remarks 所有请求的取消方法暂存
**/
export const cancelRequestMap: Map<string, cancelRequest> = new Map()
/**
  @remarks handleName
  @remarks 处理暂存到 axiosRequestMap 方法中时对应的KEY
**/
export const handleName = (config: AxiosRequestConfig) => {
  let url: string
  if (!config.requestOptions.ignoreRequest) {
    url = `${config.url}_${config.requestOptions.id}_${config.method}`
  } else {
    url = `${config.url}_${config.method}`
  }
  return url
}
/**
  @remarks addPending
  @Fun 添加一条到 axiosRequestMap
**/
export const addPending = (request: AxiosRequestConfig) => {
  axiosRequestMap.set(handleName(request), request)
  cancelRequestMap.set(request.requestOptions.id!, { cancelToken: request.cancelToken!, request })
}
/**
  @remarks deletePending
  @Fun map中删除一条
**/
export const deletePending = (request: AxiosRequestConfig) => {
  axiosRequestMap.delete(handleName(request))
  if (axiosRequestMap.size === 0) {
    cancelRequestMap.clear()
  } else {
    cancelRequestMap.delete(request.requestOptions.id!)
  }
}
/**
  @remarks cancelPending
  @Fun 调用取消方法取消请求，并从map中删除
**/
export const cancelPending = (id: string) => {
  if (cancelRequestMap.has(id)) {
    const { request, cancelToken } = cancelRequestMap.get(id)!
    cancelToken(request.requestOptions.ignoreMsg)
    deletePending(request)
  }
}

export const a: SetOptional<AxiosRequestConfig, 'requestOptions'> = {
  timeout: 1,
  url: '1'
}
