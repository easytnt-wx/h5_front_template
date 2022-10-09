import axios from 'axios'
import router from '@/router'
import store from '@/store'
import storage from 'store'

import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { parseQuery } from '@/utils/util'

const queryObj = parseQuery()

let proxy = queryObj.ip ? `/${queryObj.ip}` : ''

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: `${proxy}${process.env.VUE_APP_API_BASE_URL}`,
  timeout: 60000 // 请求超时时间
})

// http异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      console.log(`未授权 ${data.message}`)
    }
    if (error.response.status === 401) {
      console.log(`登录信息过期 ${data.message}`)
    }
    if (error.response.status === 500) {
      console.log(`系统异常，请稍后再试~`)
    }
  }
  return Promise.reject(error)
}

// server异常拦截器
const serverErrorHandler = response => {
  let resData = response.data
  let code = resData.status

  if (code === 200) {
    return resData
  }

  switch (code) {
    case 401:
      console.log(`登录信息过期 ${resData.message}`)
      break
    case 403:
      console.log(`未授权 ${resData.message}`)
      break
    case 500:
      console.error(resData.message || '请求出现错误，请稍后再试')
      break
    default:
      console.error(resData.message || '请求出现错误，请稍后再试')
      break
  }

  return Promise.reject(resData)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get('ACCESS_TOKEN')
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(response => {
  return serverErrorHandler(response)
  // return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
