<template>
  <nav class="fixed top-0 left-0 w-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-md z-50">
    <div class="flex justify-between items-center w-full px-6 py-4">
      <h1 class="text-4xl font-extrabold tracking-wide text-white">Hazza Bike</h1>
      <div class="flex gap-12">
        <RouterLink to="/" class="navbar-link">Beranda</RouterLink>
        <RouterLink to="/lokasi" class="navbar-link">Lokasi</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar-link {
  display: inline-block;
  color: white !important;
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-link:hover {
  color: #4b5563;
}
</style>
