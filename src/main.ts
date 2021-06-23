import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// import loadComponents from '@/components'
import loadComponents from 'vue3-components-ff/src/components'

import '@/icons'
import '@/styles/index.scss' // global css
import '@/permission' // permission control
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
loadComponents(app)
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')
