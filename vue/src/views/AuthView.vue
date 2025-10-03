<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="theme-toggle">
        <label>
          <input type="checkbox" v-model="isDark" @change="toggleTheme" />
          Тёмная тема
        </label>
      </div>

      <h2>{{ isLogin ? 'Вход' : 'Регистрация' }}</h2>

      <form @submit.prevent="handleSubmit">
        <input v-model="form.username" placeholder="Имя пользователя" :class="{ error: errors.username }" />
        <input v-model="form.password" type="password" placeholder="Пароль" :class="{ error: errors.password }" />
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isLogin = ref(true)
const isDark = ref(false)
const form = ref({ username: '', password: '' })
const errors = ref<{ username?: boolean; password?: boolean }>({})
const message = ref('')

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})

function toggleTheme() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

function toggleMode() {
  isLogin.value = !isLogin.value
  form.value.username = ''
  form.value.password = ''
  errors.value = {}
  message.value = ''
}

async function handleSubmit() {
  errors.value = {}
  if (!form.value.username) errors.value.username = true
  if (!form.value.password) errors.value.password = true
  if (Object.keys(errors.value).length) return

  const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/signup'
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    if (!res.ok) {
      message.value = data.error || 'Ошибка авторизации'
    } else {
      message.value = 'Успешно!'
    }
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
  padding: 1rem;
  background: var(--bg-color);
  transition: background 0.3s ease;
}

.auth-box {
  background: var(--box-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  color: var(--text-color);
  transition: background 0.3s ease, color 0.3s ease;
}

.theme-toggle {
  text-align: right;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  background: var(--input-bg);
  color: var(--text-color);
  transition: background 0.3s ease, color 0.3s ease;
}

input.error {
  border-color: red;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  background: var(--button-bg);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background: var(--button-hover);
}

.toggle {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
}

.toggle a {
  color: var(--button-bg);
  cursor: pointer;
  margin-left: 0.25rem;
  text-decoration: underline;
}

.message {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--text-color);
}

@media (max-width: 600px) {
  .auth-box {
    padding: 1.5rem;
    border-radius: 8px;
  }

  input,
  button {
    font-size: 0.95rem;
    padding: 0.65rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>