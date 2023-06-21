import { createApp } from 'vue'
import { createPinia } from 'pinia'
import clickOutside from '@/directives/outsideClick'
import '@/assets/styles/styles.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', clickOutside)

app.mount('#app')
