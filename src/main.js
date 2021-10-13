import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/mock'


const app = createApp(App)
app.config.globalProperties.$request = request
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
