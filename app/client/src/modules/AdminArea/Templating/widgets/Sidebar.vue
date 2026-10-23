<template>
  <aside
    :class="[
      'bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col',
      isOpen ? 'w-64' : 'w-20',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 border-b border-gray-700">
      <div v-if="isOpen" class="flex items-center space-x-2">
        <span class="ml-2 text-xl font-bold">AdminPro</span>
      </div>
      <div
        v-else
        class="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="handleNavigate(item.id)"
        :class="[
          'w-full flex items-center gap-x-4 px-5 py-4 rounded-lg transition-all duration-200',
          activeItem === item.id
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
            : 'hover:bg-gray-700',
        ]"
      >
        <!-- ICON -->
        <svg class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="getIcon(item.icon)"
          />
        </svg>

        <!-- LABEL -->
        <span v-if="isOpen" class="flex-1 text-left">
          {{ item.label }}
        </span>

        <!-- BADGE -->
        <span
          v-if="isOpen && item.badge"
          class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          {{ item.badge }}
        </span>
      </button>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-700">
      <button
        @click="$emit('toggle')"
        class="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <svg
          :class="['h-6 w-6 transition-transform', isOpen ? 'rotate-0' : 'rotate-180']"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
        <span v-if="isOpen" class="ml-2">Sembunyikan</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { pages } from '@/modules/AdminArea/Templating/ts/page'

interface MenuItem {
  id: string
  label: string
  icon: string
  badge?: number
}

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
    // NEW ICONS
    berita: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v12a2 2 0 01-2 2z',

    home: 'M3 12l9-9 9 9v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V12H9v9a2 2 0 01-2 2H3z',

    event: 'M8 7V3m8 4V3m-9 8h10m2-5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8z',

    gallery: 'M4 16l4-4a2 2 0 012 0l3 3 4-4v9H4v-4zm0-8h16v4H4V8z',
  }

  return icons[iconName] || icons.home
}
</script>
