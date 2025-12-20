import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css';
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// Important: initialize auth on app start
// const auth = useAuthStore()
// auth.initFromStorage()

app.use(router)
app.mount('#app')

// // Important: initialize auth on app start
const auth = useAuthStore()
auth.initFromStorage()
