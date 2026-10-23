<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <p class="text-gray-600 mt-2">Selamat datang di panel admin aplikasi Tamsar</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in statsCards" :key="stat.title" class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">{{ stat.title }}</p>
              <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ stat.value }}</h3>
              <span class="text-green-500 text-sm mt-2 inline-block"
                >{{ stat.change }} dari bulan lalu</span
              >
            </div>
            <div :class="stat.color" class="rounded-full p-3">
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Content berdasarkan tab aktif -->
      <div v-if="activeTab === 'berita'" class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">Berita Terbaru</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Judul
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Kategori
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tanggal
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Views
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="news in recentNews" :key="news.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ news.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ news.category }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ news.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ news.views }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="
                      news.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    "
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ news.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="activeTab === 'galeri'" class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">Galeri Foto</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
          <div v-for="photo in galleryPhotos" :key="photo.id" class="relative group cursor-pointer">
            <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-400">
                <component :is="photo.icon" class="w-12 h-12" />
              </div>
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center"
            >
              <div class="opacity-0 group-hover:opacity-100 text-white text-center">
                <p class="text-sm font-medium">{{ photo.title }}</p>
                <p class="text-xs">{{ photo.likes }} likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'event'" class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">Event Mendatang</h2>
        </div>
        <div class="p-6">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="border-l-4 border-blue-500 pl-4 py-4 mb-4 hover:bg-gray-50"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{{ event.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ event.description }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="text-xs text-gray-500">📅 {{ event.date }}</span>
                  <span class="text-xs text-gray-500">📍 {{ event.location }}</span>
                  <span class="text-xs text-gray-500">👥 {{ event.participants }} peserta</span>
                </div>
              </div>
              <span
                :class="
                  event.type === 'Online'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                "
                class="px-3 py-1 text-xs font-semibold rounded-full"
              >
                {{ event.type }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Chart placeholder -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Statistik Pengunjung</h3>
          <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p class="text-gray-400">Chart akan ditampilkan di sini</p>
          </div>
        </div>

        <!-- Activity feed -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start gap-3"
            >
              <div :class="activity.color" class="rounded-full p-2 mt-1">
                <component :is="activity.icon" class="w-4 h-4 text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-800">{{ activity.text }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  Image,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
} from 'lucide-vue-next'

import { getAllEvents } from '@/service/event'

// ============================
// NAVIGATION
// ============================
const activeTab = ref('overview')

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'berita', name: 'Berita' },
  { id: 'galeri', name: 'Galeri' },
  { id: 'event', name: 'Event' },
]

// ============================
// STATIC DUMMY DATA
// ============================
const statsCards = reactive([
  {
    title: 'Total Galeri',
    value: '156',
    icon: Image,
    color: 'bg-blue-500',
    change: '+12%',
  },
  {
    title: 'Total Berita',
    value: '89',
    icon: FileText,
    color: 'bg-green-500',
    change: '+8%',
  },
  {
    title: 'Event Aktif',
    value: '24',
    icon: Calendar,
    color: 'bg-purple-500',
    change: '+5%',
  },
  {
    title: 'Total Pengunjung',
    value: '12.5K',
    icon: Users,
    color: 'bg-orange-500',
    change: '+23%',
  },
])

// ============================
// EVENT FROM API
// ============================
const upcomingEvents = ref([])

const fetchEvents = async () => {
  try {
    const events = await getAllEvents()

    // mapping ke bentuk yang sesuai templatenya
    upcomingEvents.value = events.map((ev: any) => ({
      id: ev.id,
      title: ev.name,
      description: ev.deskripsi,
      date: ev.event_date,
      location: ev.lokasi,
      participants: 0, // kalau belum ada field peserta
      type: 'Offline',
    }))

    console.log('Fetched Events:', upcomingEvents.value)
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

onMounted(fetchEvents)

// ============================
// Dummy lainnya (berita, galeri, dll)
// ============================
const recentNews = reactive([
  {
    id: 1,
    title: 'Peluncuran Program Tamsar 2024',
    category: 'Pengumuman',
    date: '2024-11-10',
    views: 245,
    status: 'Published',
  },
  {
    id: 2,
    title: 'Workshop Teknologi Pendidikan',
    category: 'Event',
    date: '2024-11-09',
    views: 189,
    status: 'Published',
  },
  {
    id: 3,
    title: 'Pencapaian Siswa Berprestasi',
    category: 'Berita',
    date: '2024-11-08',
    views: 312,
    status: 'Published',
  },
  {
    id: 4,
    title: 'Kegiatan Ekstrakurikuler Semester Ini',
    category: 'Kegiatan',
    date: '2024-11-07',
    views: 156,
    status: 'Draft',
  },
  {
    id: 5,
    title: 'Penerimaan Siswa Baru 2025',
    category: 'Pengumuman',
    date: '2024-11-05',
    views: 423,
    status: 'Published',
  },
])

const galleryPhotos = reactive([
  { id: 1, title: 'Upacara Bendera', likes: 45, icon: Image },
  { id: 2, title: 'Kegiatan Olahraga', likes: 32, icon: Image },
  { id: 3, title: 'Workshop Siswa', likes: 56, icon: Image },
  { id: 4, title: 'Lomba Seni', likes: 78, icon: Image },
])

const recentActivities = reactive([
  {
    id: 1,
    text: 'Admin menambahkan 5 foto baru ke galeri',
    time: '5 menit lalu',
    icon: Image,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    text: 'Berita "Workshop Teknologi" dipublikasikan',
    time: '15 menit lalu',
    icon: FileText,
    color: 'bg-green-500',
  },
])
</script>

<style scoped>
/* Custom styles jika diperlukan */
</style>
