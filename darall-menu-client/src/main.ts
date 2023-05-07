import { createApp } from 'vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import './style/base.css'
import App from './App.vue'
import { router } from "./routes";
import axios from "axios";
import { createPinia } from 'pinia'
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
});

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// @ts-ignore
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
