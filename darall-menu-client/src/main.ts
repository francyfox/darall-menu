import { createApp } from 'vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import './style.css'
import App from './App.vue'
import { router } from "./routes";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL ?? 'http://localhost:3000/api'
});

console.log(import.meta.env)

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// @ts-ignore
const app = createApp(App)
app.use(router)

app.mount('#app')
