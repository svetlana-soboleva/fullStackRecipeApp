import './assets/style.css'
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import '@formkit/addons/css/multistep'
import '@formkit/themes/genesis'
import config from '../formkit.config'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(formKitPlugin, defaultConfig(config))
app.use(router)

app.mount('#app')
