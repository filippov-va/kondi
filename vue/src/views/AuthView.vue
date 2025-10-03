<template>
  <div class="auth">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Имя пользователя" />
      <input v-model="password" type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
    </form>

    <h2>Регистрация</h2>
    <form @submit.prevent="signup">
      <input v-model="newUsername" placeholder="Имя пользователя" />
      <input v-model="newPassword" type="password" placeholder="Пароль" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const newUsername = ref('')
const newPassword = ref('')

const login = async () => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  const data = await res.json()
  console.log('Login response:', data)
}

const signup = async () => {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: newUsername.value, password: newPassword.value })
  })
  const data = await res.json()
  console.log('Signup response:', data)
}
</script>

<style scoped>
.auth {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}
input {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>