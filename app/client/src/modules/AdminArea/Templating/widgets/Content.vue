<template>
  <main class="flex-1 overflow-y-auto bg-slate-100 px-6 py-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          Hazza Bike / {{ activePage?.label }}
        </p>
        <h1 class="mt-1 text-2xl font-bold text-slate-900">{{ activePage?.label }}</h1>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Transition name="page" mode="out-in">
          <component :is="activePage?.component" :key="activePage?.id" />
        </Transition>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pages } from '@/modules/AdminArea/Templating/ts/page'

const props = defineProps<{ currentPage: string }>()

const activePage = computed(() => {
  return pages.find((p) => p.id === props.currentPage) || pages[0]
})
</script>
