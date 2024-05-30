import axios from 'axios'
import { Notify,Dialog  } from 'quasar'
import {getToken} from 'src/utils/auth'
import errorCode from 'src/utils/errorCode'
import {tansParams, blobValidate} from 'src/utils/ruoyi'
import cache from 'src/plugins/cache'
import config from "src/config/index"
import router from "src/router/index"
let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = {show: false};

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: config.baseUrl,
  // 超时
  timeout: 10000
})

// request interceptor
service.interceptors.request.use(config => {
  // Do you need to set token
  const isToken = (config.headers || {}).isToken === false
  // Is it necessary to prevent repeated submission of data?
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false

  console.log("interceptors request headers")
   //console.log(getToken())
   //console.log(isToken)
  if (getToken() && !isToken) {
    // console.log("AJOUTER Authorization headers")
    config.headers['Authorization'] = 'Bearer ' + getToken() // Let each request carry a custom token. Please modify it according to the actual situation.
  }
  // get request mapping params parameters
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const requestSize = Object.keys(JSON.stringify(requestObj)).length; // Request data size
    const limitSize = 5 * 1024 * 1024; // Limit storage data to 5M
    if (requestSize >= limitSize) {
      console.warn(`[${config.url}]: ` + 'The requested data size exceeds the allowed 5M limit and cannot be verified against repeated submissions.。')
      return config;
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url; // Request address
      const s_data = sessionObj.data; // Request data
      const s_time = sessionObj.time; // Request time
      const interval = 1000; // Interval time (ms), less than this time is considered a repeated submission
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = 'Data is being processed, please do not resubmit';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;

                // Dialog.create({
                //   title: 'system hint',
                //   message: 'The login status has expired. You can continue to stay on this page or log in again.',
                //   ok: "OK",
                //   cancel: "Cancel",
                //   focus:"none",
                //   persistent: true
                // }).onOk(() => {
                //   router.replace("/login")
                // }).onCancel(() => {
                //   console.log('>>>> Cancel')
                // }).onDismiss(() => {
                //   console.log('I am triggered on both OK and Cancel')
                // })
              }
              console.log(res.data.msg)
      return Promise.reject('password is incorrect or expird. please try again, please log in again。')
    } else if (code === 500) {
      Notify.create({
        message: msg,
        type: "negative",
        position: "center"
      })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      Notify.create({
        message: msg,
        type: "warning",
        position: "center"
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notify.create({
        message: msg,
        position: "center"
      })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  error => {
    console.log('err' + error)
    let {message} = error;
    if (message == "Network Error") {
      message = "Backend interface connection abnormality";
    } else if (message.includes("timeout")) {
      message = "System interface request timeout";
    } else if (message.includes("Request failed with status code")) {
      message = "System interface" + message.substr(message.length - 3) + "abnormal";
    }
    Notify.create({
      message: message,
      type: "negative",
      timeout: 5 * 1000,
      multiLine: true,
      position: "center"
    })
    return Promise.reject(error)
  }
)


export default service
