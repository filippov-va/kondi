import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: AuthView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router