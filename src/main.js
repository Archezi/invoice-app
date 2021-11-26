import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import BaseCard from './components/UI/BaseCard'
import BaseButton from './components/UI/BaseButton'
import BaseLoading from './components/UI/BaseLoading'
import BaseCloseButton from './components/UI/BaseCloseButton'
const app = createApp(App)

app.use(store)
app.use(router)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-loading', BaseLoading)
app.component('base-close-button', BaseCloseButton)

app.mount('#app')
