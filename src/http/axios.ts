import { axiosAddTime, axiosTimeName, axiosTokenName, httpStatus, RETRY_COUNTCODE } from '@/config'
import { RequestEnum } from '@/enum/axios'
import { useGo } from '@/hooks/router'
import { routeStore } from '@stores/modules/routeStore'
import { userProfileStore } from '@stores/modules/user'
import type { SetOptional } from '@/type'
import type { ErrorInfo, TConversion } from '@/type/http'
import { createNotification } from '@/utils/message'
import { uuid } from '@/utils/utils'
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { addCancel } from './addCancel'
import { cancelPending, deletePending } from './cancel'
import { TipMsg } from './Tips'
export class VAxios {
  private AxiosInstance: AxiosInstance
  constructor(requestOptions: AxiosRequestConfig) {
    // this.requestOptions = requestOptions
    this.AxiosInstance = axios.create(requestOptions)
    this.interceptors() //this.AxiosInstance
  }
  //   拦截器axiosInstance: AxiosInstance
  private interceptors() {
    this.initRequestInterceptors()
    this.initResponseInterceptors()
  }
  //   请求拦截器
  private initRequestInterceptors() {
    this.AxiosInstance.interceptors.request.use(
      async (request: InternalAxiosRequestConfig) => {
        const { requestOptions } = request
        const { joinTime, withToken, ignoreRequest } = requestOptions
        // 处理id
        if (!requestOptions.id) {
          requestOptions.id = uuid()
        }
        // 参数增加时间戳，get...等请求方式缓存
        if (joinTime && axiosAddTime.includes(request.method as RequestEnum)) {
          try {
            Reflect.set(request.params, axiosTimeName, Number(new Date()))
          } catch {
            request.params = {}
            Reflect.set(request.params, axiosTimeName, Number(new Date()))
          }
        }
        // 添加token
        if (withToken) {
          Reflect.set(request.headers!, axiosTokenName, userProfileStore().token)
        }
        // 忽略重复请求
        if (ignoreRequest) {
          cancelPending(requestOptions.id)
        }
        // 记录当前请求
        addCancel(request)
        // setTimeout(() => {
        //   cancelPending(requestOptions.id!)
        // }, 0)
        return request
      },
      async (error: AxiosError) => {
        createNotification({
          title: '系统异常',
          description: String(error.response!.status),
          content: error.message,
          type: 'error'
        })
        return Promise.reject(error)
      }
    )
  }
  //   响应拦截器
  private initResponseInterceptors() {
    this.AxiosInstance.interceptors.response.use(
      async (response: AxiosResponse) => {
        const config = response.config
        // 当前请求完成，删除请求前暂存的请求
        deletePending(config)
        if (config.requestOptions?.isReturnNativeResponse) {
          //是否需要对原生头处理
          return response
        }
        // 直接获取到data
        if (config.requestOptions.isConversionRequestResult) {
          const { success, message } = response.data
          if (!success) {
            createNotification({
              title: '请求错误',
              content: message,
              type: 'error'
            })
            // return response.data
            return Promise.reject(response.data)
          }
          return response.data.data
        }
        return response.data
      },
      // eslint-disable-next-line complexity
      async (error: AxiosError) => {
        /**
         * 1.是否是cancel取消的
         * 2.是否是401
         * 3.判断重试
         * 4.超时
         * 5.兜底处理
         **/
        // console.log(error)
        const { config, response, code, message } = error
        const isCancel = axios.isCancel(error)
        if (!isCancel) {
          deletePending(config!)
        }
        // 取消请求
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          return Promise.reject(await this.#timeout(error))
        } else if (isCancel) {
          return Promise.reject({
            status: httpStatus.cancel,
            statusText: error.message || 'error',
            success: false
          })
        } else if (response!.status === 401) {
          return Promise.reject(this.#returnParams(error)).finally(async () => {
            createNotification({
              title: '系统异常',
              description: `${response!.status}`,
              content: '登录过期,即将重新登陆',
              type: 'error'
            })
            const router = routeStore()
            router.reset(async () => {
              const go = useGo()
              go('/login')
            })
          })
        } else if (
          config &&
          config.requestOptions?.count &&
          config.requestOptions.openRetry &&
          response &&
          RETRY_COUNTCODE.includes(response.status)
        ) {
          return Promise.reject(await this.#retry(error))
        } else if (config) {
          TipMsg(error)
          return Promise.reject(this.#returnParams(error))
        }
        return Promise.reject(error)
      }
    )
  }
  /**
   * 重试
   * **/
  #retry(error: AxiosError): Promise<ErrorInfo> {
    const config = error.config!
    const [RETRY_COUNT, RETRY_INTERVAL] = [
      config.requestOptions.count,
      config.requestOptions.interval
    ]
    config.requestOptions.retryCount = config.requestOptions.retryCount || 0
    if (config.requestOptions.retryCount >= RETRY_COUNT!) {
      return Promise.resolve(this.#returnParams(error))
    }
    config.requestOptions.retryCount++
    const backSend = new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, RETRY_INTERVAL || 1)
    })
    return backSend.then(async () => {
      return await this.AxiosInstance(config)
    })
  }
  /**
   * 超时
   * **/
  #timeout(error: AxiosError) {
    const ignore: ErrorInfo = {
      status: httpStatus.timeout,
      statusText: '请求超时',
      success: false
    }
    createNotification({
      title: '系统异常',
      description: String(httpStatus.timeout),
      content: '请求超时',
      type: 'error'
    })
    deletePending(error.config!)
    return Promise.resolve(ignore)
  }
  /**
   * 处理返回数据
   * **/
  #returnParams(error: AxiosError): ErrorInfo {
    const { response, config } = error
    return {
      status: response!.status,
      statusText: response!.statusText || '??',
      success: false,
      ...(config!.requestOptions.isReturnNativeResponse ? { response } : {})
    }
  }
  /**
   * @description 请求主体
   **/
  require<T = any>(config: SetOptional<AxiosRequestConfig, 'requestOptions'>): Promise<T> {
    return this.AxiosInstance.request({
      requestOptions: {},
      ...config
    })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  get<T = any, conversion extends boolean = true>(
    url: string,
    params?: Record<string, Object>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({ url, method: 'get', params, ...config })
  }

  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  head<T = any, conversion extends boolean = true>(
    url: string,
    params?: Record<string, Object>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({
      url,
      method: 'head',
      params,
      ...config
    })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  options<T = any, conversion extends boolean = true>(
    url: string,
    params?: Record<string, Object>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({
      url,
      method: 'options',
      params,
      ...config
    })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  delete<T = any, conversion extends boolean = true>(
    url: string,
    params?: Record<string, Object>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({
      url,
      method: 'delete',
      params,
      ...config
    })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  post<T = any, conversion extends boolean = true>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({ url, method: 'post', data, ...config })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  put<T = any, conversion extends boolean = true>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({
      url,
      method: 'put',
      data,
      ...config
    })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  patch<T = any, conversion extends boolean = true>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({
      url,
      method: 'patch',
      data,
      ...config
    })
  }
  /**
   * @url string
   * @params {}
   * @config RequestOptions
   **/
  uploadFile<T = FormData, conversion extends boolean = true>(
    url: string,
    data?: FormData,
    config?: AxiosRequestConfig
  ): Promise<TConversion<conversion, T>> {
    return this.require({
      url,
      method: 'post',
      data,
      ...config
    })
  }
}
