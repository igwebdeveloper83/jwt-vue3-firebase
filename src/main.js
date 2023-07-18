import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyBusPXFD_vBcZDsdV9FdLVAuHRZwxbxnUg',
  authDomain: 'jwt-vue3-firebase-82c4e.firebaseapp.com',
  projectId: 'jwt-vue3-firebase-82c4e',
  storageBucket: 'jwt-vue3-firebase-82c4e.appspot.com',
  messagingSenderId: '968546963745',
  appId: '1:968546963745:web:021e2d5d8ad788b3a8ee60'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
