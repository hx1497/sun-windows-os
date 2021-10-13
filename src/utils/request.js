import axios from 'axios'
import router from '../router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {}
})

//封装请求

//请求拦截
service.interceptors.request.use(config => {
  if(window.localStorage.token) {
    config.headers["Authorization"] = `Bearer ${localStorage.token}`
  }
  return config
},err => {
  console.log(err)
  Promise.reject(err)
})

//响应拦截
service.interceptors.response.use(res => {
  return res
},err => {
  if(err.response) {
    switch (err.response.status) {
      case 401:  
        localStorage.clear()
        router.replace('/')
    }
  }
  return Promise.reject(err.response.data)
})

export default service