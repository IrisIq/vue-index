import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import service from '@/utils/http'
import VueAxios from 'vue-axios' // 导入 vue-axios

// 引用ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引用mitt
import mitt from 'mitt'

// 引用全局css
import '@/assets/css/globle.css'

import elementDialog from '@/components/globle/elementDialog.vue'
import elementTable from '@/components/globle/elementTable'

const MyPlugin = {
  install(Vue) {
    Vue.component('elementDialog', elementDialog)
    Vue.component('elementTable', elementTable)
  }
}

const app = createApp(App)
app.config.globalProperties.$mitt = new mitt()
app.config.globalProperties.$http = service

app.use(VueAxios, service)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(MyPlugin)
app.mount('#app')
