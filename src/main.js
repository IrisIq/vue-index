import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引用mitt
import mitt from 'mitt'

// 引用全局css
import '@/assets/css/globle.css'

const app = createApp(App)
app.config.globalProperties.$mitt = new mitt()
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
