<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>{{ isLogin ? 'Вход' : 'Регистрация' }}</h2>

      <form @submit.prevent="handleSubmit">
        <input v-model="form.username" placeholder="Имя пользователя" />
        <input v-model="form.password" type="password" placeholder="Пароль" />
        <button type="submit">{{ isLogin ? 'Войти' : 'Зарегистрироваться' }}</button>
      </form>

      <p class="toggle">
        {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
        <a @click="toggleMode">{{ isLogin ? 'Зарегистрироваться' : 'Войти' }}</a>
      </p>

      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLogin = ref(true)
const form = ref({ username: '', password: '' })
const message = ref('')

function toggleMode() {
  isLogin.value = !isLogin.value
  form.value.username = ''
  form.value.password = ''
  message.value = ''
}

async function handleSubmit() {
  if (!form.value.username || !form.value.password) {
    message.value = 'Заполните все поля'
    return
  }

  const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/signup'
  try {
    const res = await fetch(endpoint, {
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

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: #ffffff;
  font-family: system-ui, sans-serif;
}

.auth-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  box-sizing: border-box;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  text-align: center;
  color: #111827;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

input {
  font-size: 1.125rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #f9fafb;
  color: #111827;
}

input::placeholder {
  color: #9ca3af;
}

input:focus {
  outline: none;
  border-color: #d1d5db;
}

button {
  font-size: 1.125rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #f9fafb;
  color: #111827;
  cursor: pointer;
}

button:hover {
  background: #f3f4f6;
}

.toggle {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
}

.toggle a {
  cursor: pointer;
  text-decoration: underline;
}

.message {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #111827;
}
</style>