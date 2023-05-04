import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from "../page/menu.vue";
import Auth from "../page/auth.vue";
import Register from "../page/register.vue";

const routes = [
  {
    path: '/',
    component: Menu
  },
  {
    path: '/login',
    component: Auth
  },
  {
    path: '/register',
    component: Register
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes,
})