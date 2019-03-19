import axios from 'axios'
import global from '../Common.vue'
/*axios.defaults.baseURL='http://localhost:8090/api'
axios.defaults.timeout=5000*/
const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config => {
      config.baseURL=global.httpUrl
     /* config.data=JSON.stringify(config.data)*/
      config.headers={'Content-Type':'application/json; charset=UTF-8'}
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => {
    console.log('.....', response)
    return response.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

export default request
