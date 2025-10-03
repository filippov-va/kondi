<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Вход</h2>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="login">Логин</label>
          <input id="login" v-model="form.login" autocomplete="login" />
          <p v-if="errors.login" class="error">{{ errors.login }}</p>
        </div>

        <div class="input-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" type="password" autocomplete="current-password" />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>

        <button type="submit">Войти</button>
      </form>

      <p class="toggle">
        Нет аккаунта? <router-link to="/signup">Зарегистрироваться</router-link>
      </p>

      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/auth.css'

const form = ref({ login: '', password: '' })
const errors = ref({ login: '', password: '' })
const message = ref('')

function validate() {
  errors.value = { login: '', password: '' }

  if (!form.value.login.trim()) {
    errors.value.login = 'Введите логин'
  }
  if (!form.value.password.trim()) {
    errors.value.password = 'Введите пароль'
  }

  return !errors.value.login && !errors.value.password
}

async function handleLogin() {
  if (!validate()) return

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    message.value = res.ok ? 'Успешно!' : data.error || 'Ошибка'
  } catch {
    message.value = 'Ошибка сети'
  }
}
</script>