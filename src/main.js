import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import BaseCard from './components/UI/BaseCard'
import BaseButton from './components/UI/BaseButton'
import BaseLoading from './components/UI/BaseLoading'
import BaseCloseButton from './components/UI/BaseCloseButton'
import BaseConfirmationModal from './components/UI/BaseConfirmationModal'
const app = createApp(App)

app.use(store)
app.use(router)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-loading', BaseLoading)
app.component('base-close-button', BaseCloseButton)
app.component('base-confirmation-modal', BaseConfirmationModal)

app.mount('#app')
