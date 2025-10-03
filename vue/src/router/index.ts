import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const routes = [
  { path: '/', component: AuthView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})