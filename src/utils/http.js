import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.1.8717/api'
// axios.defaults.timeout = 10000

const Axios = axios.create({
  baseURL: 'http://localhost:8717/api', // api base_url
  timeout: 90000 // 请求超时时间
})

axios.interceptors.request.use(
  config => {
    // ？？？？？
    config.headers = {
      'Content-Type': 'application/json' // 配置请求头
    }
    config.headers.token = 'bcyeqbfuhwrufbruwbguerng' // 配置token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  // 请求成功处理
  response => {
    const res = response
    if (res.code === 0) {
      return res
    } else {
      alert('服务器响应超时，请刷新当前页')
    }
  },
  error => {
    if (JSON.stringify(error).includes('timeout')) {
      alert('服务器响应超时，请刷新当前页')
    }
  }
)
export default Axios
