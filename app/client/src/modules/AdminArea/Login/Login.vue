<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800"
  >
    <div
      class="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent dark:from-blue-800/10"
      ></div>

      <div class="relative text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back 👋</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Sign in to your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="relative space-y-5">
        <!-- USERNAME -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="yourusername"
            class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800 px-4"
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800 px-4"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
        >
          Sign In
        </button>

        <!-- ERROR -->
        <p v-if="errorMsg" class="text-red-500 text-center text-sm">
          {{ errorMsg }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
  errorMsg.value = ''

  if (!username.value || !password.value) {
    errorMsg.value = 'Username dan password wajib diisi'
    return
  }

  try {
    const res = await axios.post('http://localhost:3001/auth/login', {
      username: username.value,
      password: password.value,
    })

    // Simpan token & user
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    // Redirect
    router.push('/admin-area')
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || 'Login gagal, coba lagi'
  }
}
</script>
