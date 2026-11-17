<template>
  <aside
    :class="[
      'flex flex-col bg-slate-900 text-slate-300 transition-all duration-300',
      isOpen ? 'w-64' : 'w-20',
    ]"
  >
    <div class="flex h-16 items-center border-b border-slate-800 px-4">
      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 16a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6zM8 10h8" />
        </svg>
      </div>
      <div v-if="isOpen" class="ml-3 min-w-0">
        <p class="truncate text-sm font-bold text-white">Hazza Bike</p>
        <p class="truncate text-xs text-slate-500">Admin Panel</p>
      </div>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="handleNavigate(item.id)"
        :class="[
          'group flex w-full items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
          activeItem === item.id
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white',
        ]"
      >
        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIcon(item.icon)" />
        </svg>
        <span v-if="isOpen" class="flex-1 truncate text-left">{{ item.label }}</span>
      </button>
    </nav>

    <div class="border-t border-slate-800 p-3">
      <button
        @click="$emit('toggle')"
        class="flex w-full items-center justify-center gap-2 rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
      >
        <svg
          :class="['h-5 w-5 transition-transform', isOpen ? 'rotate-0' : 'rotate-180']"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <span v-if="isOpen">Sembunyikan</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pages } from '@/modules/AdminArea/Templating/ts/page'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  toggle: []
  navigate: [page: string]
}>()

const activeItem = ref('dashboard')
const menuItems = pages

const handleNavigate = (id: string) => {
  activeItem.value = id
  emit('navigate', id)
}

const getIcon = (iconName: string): string => {
  const icons: Record<string, string> = {
    dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
    sepeda: 'M5 16a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6zM8 10h8M7 13h10',
    pelanggan: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm12 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    penyewaan: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    pengembalian: 'M9 14L4 9l5-5M4 9h10a6 6 0 016 6v2',
    riwayat: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    home: 'M3 12l9-9 9 9v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V12H9v9a2 2 0 01-2 2H3z',
  }

  return icons[iconName] || icons.home || ''
}
</script>
