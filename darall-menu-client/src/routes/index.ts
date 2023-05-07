import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from "../page/menu.vue";
import Auth from "../page/auth.vue";
import Register from "../page/register.vue";
import MenuEdit from "../page/menu-edit.vue";
import { validateUserTokens } from "./middleware.ts";


const routes = [
  {
    path: '/',
    component: Menu
  },
  {
    path: '/login',
    component: Auth,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/menu-edit',
    component: MenuEdit,
    beforeEnter: validateUserTokens
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes,
})