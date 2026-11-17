<template>
  <div class="space-y-4">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="text-lg font-bold text-slate-900">Buat Penyewaan Baru</h2>
      <p class="text-sm text-slate-500">Tarif Rp30.000 untuk durasi 6 jam.</p>

      <form @submit.prevent="createRental" class="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Sepeda</label>
          <select v-model="form.id_sepeda" class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
            <option value="" disabled>Pilih sepeda tersedia</option>
            <option v-for="bike in availableBikes" :key="bike.id_sepeda" :value="bike.id_sepeda">
              {{ bike.id_sepeda }} - {{ bike.nama_sepeda }}
            </option>
          </select>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Pelanggan</label>
          <select v-model="form.id_pelanggan" class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
            <option value="" disabled>Pilih pelanggan</option>
            <option v-for="p in pelanggan" :key="p.id_pelanggan" :value="p.id_pelanggan">
              {{ p.nama }} ({{ p.no_hp || 'tanpa HP' }})
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <BaseButton type="submit" full-width>Buat Sewa</BaseButton>
        </div>
      </form>
    </div>

    <div class="overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <SkeletonTable v-if="loading" :columns="7" :rows="5" />
      <table v-else class="min-w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Sepeda</th>
            <th class="px-4 py-3">Pelanggan</th>
            <th class="px-4 py-3">Waktu Sewa</th>
            <th class="px-4 py-3">Batas Waktu</th>
            <th class="px-4 py-3">Tarif</th>
            <th class="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="activeRentals.length === 0">
            <td colspan="7" class="px-4 py-10 text-center text-slate-500">Tidak ada sewa berjalan.</td>
          </tr>
          <tr v-for="r in activeRentals" :key="r.id_penyewaan" class="transition-colors hover:bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ r.id_penyewaan }}</td>
            <td class="px-4 py-3">{{ r.sepeda?.nama_sepeda }} ({{ r.sepeda?.id_sepeda }})</td>
            <td class="px-4 py-3">{{ r.pelanggan?.nama }}</td>
            <td class="px-4 py-3">{{ formatDateTime(r.waktu_sewa) }}</td>
            <td class="px-4 py-3">{{ formatDateTime(r.batas_waktu) }}</td>
            <td class="px-4 py-3">{{ formatRupiah(r.tarif) }}</td>
            <td class="px-4 py-3">
              <span class="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{{ r.status_transaksi }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Notification
      :show-notification="showNotification"
      :notification-type="notificationType"
      :notification-message="notificationMessage"
      @close="hideNotification"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/Button/BaseButton.vue'
import Notification from '@/components/Modal/Notification.vue'
import SkeletonTable from '@/components/SkeletonTable/SkeletonTable.vue'
import { useNotification } from '@/composables/useNotification'
import {
  createPenyewaan,
  getPelanggan,
  getPenyewaan,
  getSepeda,
} from '@/service/hazza'

const bikes = ref<any[]>([])
const pelanggan = ref<any[]>([])
const activeRentals = ref<any[]>([])
const loading = ref(false)
const form = ref({ id_sepeda: '', id_pelanggan: '' })

const { showNotification, notificationType, notificationMessage, displayNotification, hideNotification } = useNotification()

const availableBikes = computed(() => bikes.value.filter((b) => b.status === 'Tersedia'))

const fetchData = async () => {
  loading.value = true
  try {
    const [sepedaRes, pelangganRes, rentalRes] = await Promise.all([
      getSepeda(),
      getPelanggan(),
      getPenyewaan('Berjalan'),
    ])
    bikes.value = sepedaRes.data || []
    pelanggan.value = pelangganRes.data || []
    activeRentals.value = rentalRes.data || []
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memuat data', 'error')
  } finally {
    loading.value = false
  }
}

const createRental = async () => {
  if (!form.value.id_sepeda || !form.value.id_pelanggan) {
    displayNotification('Sepeda dan pelanggan wajib dipilih', 'error')
    return
  }

  try {
    await createPenyewaan(form.value)
    form.value = { id_sepeda: '', id_pelanggan: '' }
    await fetchData()
    displayNotification('Penyewaan berhasil dibuat', 'success')
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal membuat penyewaan', 'error')
  }
}

const formatDateTime = (value: string) =>
  value ? new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'

const formatRupiah = (value: number) => `Rp ${Number(value || 0).toLocaleString('id-ID')}`

onMounted(fetchData)
</script>
