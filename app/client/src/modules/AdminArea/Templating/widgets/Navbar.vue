<template>
  <nav class="border-b border-slate-200 bg-white">
    <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center">
        <button
          @click="$emit('toggleSidebar')"
          class="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="ml-3 text-lg font-semibold text-slate-800">
          {{ getPageTitle(currentPage) }}
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-3 sm:flex">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white">
            {{ adminInitial }}
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-700">{{ adminName }}</p>
            <p class="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
        <button
          @click="logout"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          Keluar
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  sidebarOpen: boolean
  currentPage: string
}>()

defineEmits<{
  toggleSidebar: []
}>()

const router = useRouter()

const adminName = computed(() => {
  const raw = localStorage.getItem('user')
  if (!raw) return 'Admin'
  try {
    return JSON.parse(raw).name || 'Admin'
  } catch {
    return 'Admin'
  }
})

const adminInitial = computed(() => adminName.value.charAt(0).toUpperCase())

const getPageTitle = (page: string): string => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard Digital Twin',
    sepeda: 'Kelola Sepeda',
    pelanggan: 'Kelola Pelanggan',
    penyewaan: 'Penyewaan',
    pengembalian: 'Pengembalian',
    riwayat: 'Riwayat Transaksi',
  }
  return titles[page] || 'Dashboard'
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
