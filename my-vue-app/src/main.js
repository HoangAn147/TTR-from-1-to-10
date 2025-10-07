import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createHead } from '@vueuse/head'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

pinia.use(piniaPluginPersistedstate)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(head)

app.mount('#app')