import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView },
  { path: '/', redirect: '/login' }
]

export default createRouter({
  history: createWebHistory(),
  routes
})