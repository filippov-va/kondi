<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/auth.css'

const form = ref({ name: '', login: '', password: '' })
const errors = ref({ name: '', login: '', password: '' })
const message = ref('')

function validate() {
  errors.value = { name: '', login: '', password: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Введите имя'
  }
  if (!form.value.login.trim()) {
    errors.value.login = 'Введите логин'
  }
  if (!form.value.password.trim()) {
    errors.value.password = 'Введите пароль'
  }

  return !errors.value.name && !errors.value.login && !errors.value.password
}

async function handleSignup() {
  if (!validate()) return

  try {
    const res = await fetch('/api/auth/signup', {
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

<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>Регистрация</h2>

      <form @submit.prevent="handleSignup">
        <div class="input-group">
          <label for="name">Имя</label>
          <input id="name" v-model="form.name" />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>

        <div class="input-group">
          <label for="login">Логин</label>
          <input id="login" v-model="form.login" />
          <p v-if="errors.login" class="error">{{ errors.login }}</p>
        </div>

        <div class="input-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" type="password" />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>

      <p class="toggle">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>

      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>