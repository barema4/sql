import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/employees'
import Vuelidate from '@vuelidate/core';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vuelidate);

app.mount('#app')
