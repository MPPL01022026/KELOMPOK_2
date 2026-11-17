<template>
  <div class="flex h-screen overflow-hidden bg-slate-100">
    <Sidebar :isOpen="sidebarOpen" @toggle="toggleSidebar" @navigate="handleNavigation" />

    <div class="flex flex-1 flex-col overflow-hidden">
      <Navbar
        :sidebarOpen="sidebarOpen"
        @toggleSidebar="toggleSidebar"
        :currentPage="currentPage"
      />
      <Content :currentPage="currentPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/modules/AdminArea/Templating/widgets/Navbar.vue'
import Sidebar from '@/modules/AdminArea/Templating/widgets/Sidebar.vue'
import Content from '@/modules/AdminArea/Templating/widgets/Content.vue'

const sidebarOpen = ref(true)
const currentPage = ref('dashboard')

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const handleNavigation = (page: string) => {
  currentPage.value = page
}
</script>
