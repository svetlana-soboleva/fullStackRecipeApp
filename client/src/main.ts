import './assets/style.css'
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { createMultiStepPlugin } from "@formkit/addons";
import "@formkit/addons/css/multistep";
import "@formkit/themes/genesis"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(formKitPlugin,defaultConfig({plugins: [createMultiStepPlugin()],
  })
)
app.use(router)

app.mount('#app')
