import Vue from 'vue'
import App from './App.vue'
import router from "./components/router"
import "@/components/element-ui"
import {dateFormat} from "@/components/TimeFormat/timeFormat";
import axios from "axios"
Vue.config.productionTip = false
import { Loading } from 'element-ui';
/*配置全局的axios请求*/
axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.$http = axios

// 全局loading
let loadingInstance = null
axios.interceptors.request.use((request) => {
    loadingInstance = Loading.service({ fullscreen: true });
    return request
})
axios.interceptors.response.use((response) => {
    loadingInstance.close()
    return response
})


// 时间的全局过滤器
Vue.filter("dateFormat", (time) => {
    const date = new Date(time)
    //获取时间
    let y = date.getFullYear()
    let mm = padZero(date.getMonth()+1)
    let d = padZero(date.getDay())
    let h = padZero(date.getHours())
    let m = padZero(date.getMinutes())
    let s = padZero(date.getSeconds())
    return `${y}-${mm}-${d} ${h}:${m}:${s}`
// 时间补零
  function padZero(n){
    return n > 9? n : "0" + n;
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
