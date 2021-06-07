import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import loadComponents from '@/components'
import '@/icons'
import '@/styles/index.scss' // global css

const app = createApp(App)
loadComponents(app)
app.use(store).use(router).use(ElementPlus).mount('#app')
