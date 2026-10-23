<template>
  <nav class="bg-white shadow-sm z-10">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left Side -->
        <div class="flex items-center">
          <button
            @click="$emit('toggleSidebar')"
            class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="ml-4 text-xl font-semibold text-gray-800">
            {{ getPageTitle(currentPage) }}
          </h1>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:block">
            <div class="relative">
              <input
                type="text"
                placeholder="Cari..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Notifications -->
          <button
            class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- User Profile -->
          <div class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2">
            <div
              class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
            >
              A
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-medium text-gray-700">Admin User</p>
              <p class="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  sidebarOpen: boolean
  currentPage: string
}>()

defineEmits<{
  toggleSidebar: []
}>()

const getPageTitle = (page: string): string => {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    users: 'Manajemen User',
    products: 'Produk',
    orders: 'Pesanan',
    settings: 'Pengaturan',
  }
  return titles[page] || 'Dashboard'
}
</script>
