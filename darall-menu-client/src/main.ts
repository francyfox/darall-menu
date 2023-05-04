import { createApp } from 'vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import './style.css'
import App from './App.vue'
import { router } from "./routes";

// @ts-ignore
const app = createApp(App)
app.use(router)

app.mount('#app')
