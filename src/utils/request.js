import _ from 'lodash'
import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '../store'
import qs from 'qs'

/**
 * 浮层消息停留时间
 */
const TOAST_DURATION = 5 * 1000 // 5 sec

/**
 * 请求超时
 */
const REQUEST_TIMEOUT = 600 * 1000 // 600 secs

/**
 * HTTP 状态码
 */
const HTTP_STATUS = {
  /**
   * HTTP 401 Unauthorized
   */
  UNAUTHORIZED: 401,
  /**
   * HTTP 403 Forbidden
   */
  FORBIDDEN: 403
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: REQUEST_TIMEOUT //  请求超时时间
})
service.defaults.timeout = REQUEST_TIMEOUT

/**
 * 处理异常 HTTP 响应
 * @param {*} errorResponse 异常 HTTP 响应
 */
function handleErrorResponse(errorResponse) {
  const response = _.get(errorResponse, 'response')
  const status = (response && response.status) || ''
  if (status === HTTP_STATUS.UNAUTHORIZED) {
    // 身份认证失效，需要重新登录
    store.dispatch('clearToken').then(() => {
      // 重新加载页面
      location.reload()
    })
  } else {
    // 其它错误
    const msg = (response && response.data && response.data.message) || ''
    switch (status) {
      case 400:
        Message.error(msg)
        break
      case 404:
        Message.error('请求出错，请稍后重试')
        break
      case 408:
        Message.error('请求超时，请稍后重试')
        break
      case 500:
        Message.error('服务端响应失败，请稍后重试')
        break
      case 501:
        Message.error('服务端响应未实现，请稍后重试')
        break
      case 502:
        Message.error('网络错误，请稍后重试')
        break
      case 503:
        Message.error('服务不可用，请稍后重试')
        break
      case 504:
        Message.error('网络超时，请稍后重试')
        break
      case 505:
        Message.error('HTTP版本不支持，请稍后重试')
        break
      default:
        Message.error('连接出错，请稍后重试')
    }
    /*
     * 以服务的方式调用的全屏 Loading 是单例的：
     * 若在前一个全屏 Loading 关闭前再次调用全屏 Loading，
     * 并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例
     */
    const loadingInstance = Loading.service()
    // 模拟$nextTick异步处理
    setTimeout(() => {
      loadingInstance.close()
    }, 20)
  }
}

// 处理页面中未被捕获的 Promise rejection
window.addEventListener && window.addEventListener('unhandledrejection', event => {
  const { reason: error } = event
  if (_.has(error, 'response') && error.message) {
    // 仅在 HTTP 响应异常时触发错误提示
    Message({
      message: error.message,
      type: 'error',
      duration: TOAST_DURATION
    })
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (config && store.getters.token) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Fmds-Access-Token'] = store.getters.token
    }
    return config
  },
  error => {
    // Do something with request error
    console.debug(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response && response.data
    /*
     * 不做对code的判断，部分接口不规范的会走 reject
     * if (Object.is(res && res.code, 0)) {
     *   return Promise.resolve(res)
     * } else {
     *   return Promise.reject(res)
     * }
     */
    return Promise.resolve(res)
  },
  error => Promise.reject(error)
)

/**
 * 新版 RESTful HTTP
 */
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API.replace(/\/+$/, ''),
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
})
http.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code !== 0) {
      throw data
    }
    return data.data
  },
  error => handleErrorResponse(error)
)

/**
 * 统一处理catch情况
 */
const fetch = (requestData) => {
  return new Promise((resolve, reject) => {
    service({
      ...requestData
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      handleErrorResponse(err)
      // reject(err)
    })
  })
}

export { http }
export default fetch
