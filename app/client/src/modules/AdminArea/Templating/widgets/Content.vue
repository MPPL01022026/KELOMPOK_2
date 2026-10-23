<template>
  <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
    <!-- PAGE TITLE (di luar card) -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      {{ activePage?.label }}
    </h1>

    <!-- FULL PAGE CARD -->
    <div class="bg-white shadow rounded-xl p-6 w-full">
      <component :is="activePage?.component" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { pages } from '@/modules/AdminArea/Templating/ts/page'

const props = defineProps<{ currentPage: string }>()

const activePage = computed(() => {
  return pages.find((p) => p.id === props.currentPage) || pages[0]
})
</script>
