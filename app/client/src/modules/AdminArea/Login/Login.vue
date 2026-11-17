<template>
  <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 px-4">
    <div class="w-full max-w-md">
      <div class="mb-6 flex items-center justify-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 ring-1 ring-white/20">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 16a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6zM8 10h8" />
          </svg>
        </div>
        <div>
          <p class="text-lg font-bold text-white">Hazza Bike</p>
          <p class="text-xs text-emerald-200/70">Admin Panel</p>
        </div>
      </div>

      <div class="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-900/5">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-900">Masuk ke Dashboard</h1>
          <p class="mt-1 text-sm text-slate-500">Kelola armada dan transaksi penyewaan.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="username"
              class="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="password"
              class="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>

          <button
            type="submit"
            class="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[.99]"
          >
            Masuk
          </button>
        </form>
      </div>

      <p class="mt-6 text-center text-xs text-emerald-100/50">
        Default login: admin / admin
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/service/api'

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
    const res = await api.post('/auth/login', {
      username: username.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    router.push('/admin-area')
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || 'Login gagal, coba lagi'
  }
}
</script>
