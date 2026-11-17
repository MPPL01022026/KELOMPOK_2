<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-bold text-slate-900">Digital Twin Armada</h2>
      <p class="text-sm text-slate-500">Ringkasan status dan kondisi sepeda Hazza Bike.</p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner label="Memuat dashboard..." />
    </div>

    <template v-else-if="summary">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Total Sepeda</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Bike class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-3 text-3xl font-bold text-slate-900">{{ summary.sepeda.total }}</p>
        </div>
        <div class="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm transition-shadow hover:shadow-md">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-emerald-700">Tersedia</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-3 text-3xl font-bold text-emerald-700">{{ summary.sepeda.tersedia }}</p>
        </div>
        <div class="rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm transition-shadow hover:shadow-md">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-amber-700">Disewa</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Clock class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-3 text-3xl font-bold text-amber-700">{{ summary.sepeda.disewa }}</p>
        </div>
        <div class="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm transition-shadow hover:shadow-md">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-red-700">Tidak Tersedia</p>
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <XCircle class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-3 text-3xl font-bold text-red-700">{{ summary.sepeda.tidak_tersedia }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <CheckCircle2 class="h-5 w-5" />
            </span>
            <p class="text-sm font-medium text-slate-500">Kondisi Baik</p>
          </div>
          <p class="mt-3 text-2xl font-bold text-slate-900">{{ summary.kondisi.baik }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Wrench class="h-5 w-5" />
            </span>
            <p class="text-sm font-medium text-slate-500">Perlu Perawatan</p>
          </div>
          <p class="mt-3 text-2xl font-bold text-slate-900">{{ summary.kondisi.perlu_perawatan }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <XCircle class="h-5 w-5" />
            </span>
            <p class="text-sm font-medium text-slate-500">Rusak</p>
          </div>
          <p class="mt-3 text-2xl font-bold text-slate-900">{{ summary.kondisi.rusak }}</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
              <Users class="h-5 w-5" />
            </span>
            <p class="text-sm font-medium text-slate-500">Pelanggan</p>
          </div>
          <p class="mt-3 text-2xl font-bold text-slate-900">{{ summary.pelanggan }}</p>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="font-semibold text-slate-900">Sewa Berjalan</h3>
        <div v-if="activeRentals.length === 0" class="mt-3 text-sm text-slate-500">
          Tidak ada sewa yang sedang berjalan.
        </div>
        <div v-else class="mt-3 overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th class="py-2 pr-4">ID</th>
                <th class="py-2 pr-4">Sepeda</th>
                <th class="py-2 pr-4">Pelanggan</th>
                <th class="py-2 pr-4">Batas Waktu</th>
                <th class="py-2">Tarif</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="r in activeRentals" :key="r.id_penyewaan" class="hover:bg-slate-50">
                <td class="py-2 pr-4 font-semibold text-slate-900">{{ r.id_penyewaan }}</td>
                <td class="py-2 pr-4">{{ r.sepeda?.nama_sepeda }}</td>
                <td class="py-2 pr-4">{{ r.pelanggan?.nama }}</td>
                <td class="py-2 pr-4">{{ formatDateTime(r.batas_waktu) }}</td>
                <td class="py-2">{{ formatRupiah(r.tarif) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <Notification
      :show-notification="showNotification"
      :notification-type="notificationType"
      :notification-message="notificationMessage"
      @close="hideNotification"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Bike, CheckCircle2, Clock, Users, Wrench, XCircle } from 'lucide-vue-next'
import LoadingSpinner from '@/components/Loading/LoadingSpinner.vue'
import Notification from '@/components/Modal/Notification.vue'
import { useNotification } from '@/composables/useNotification'
import { getDashboard, getPenyewaan } from '@/service/hazza'

const summary = ref<any | null>(null)
const activeRentals = ref<any[]>([])
const loading = ref(false)

const { showNotification, notificationType, notificationMessage, displayNotification, hideNotification } = useNotification()

const fetchData = async () => {
  loading.value = true
  try {
    const [dashRes, rentalRes] = await Promise.all([getDashboard(), getPenyewaan('Berjalan')])
    summary.value = dashRes.data
    activeRentals.value = (rentalRes.data || []).slice(0, 5)
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memuat dashboard', 'error')
  } finally {
    loading.value = false
  }
}

const formatDateTime = (value: string) =>
  value ? new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'

const formatRupiah = (value: number) => `Rp ${Number(value || 0).toLocaleString('id-ID')}`

onMounted(fetchData)
</script>
