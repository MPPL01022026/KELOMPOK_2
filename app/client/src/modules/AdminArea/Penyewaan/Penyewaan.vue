<template>
  <div class="space-y-4">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="text-lg font-bold text-slate-900">Buat Penyewaan Baru</h2>
      <p class="text-sm text-slate-500">Tarif Rp30.000 untuk durasi 6 jam.</p>

      <form @submit.prevent="createRental" class="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Sepeda</label>
          <div class="relative">
            <select v-model="form.id_sepeda" class="admin-select">
              <option value="" disabled>Pilih sepeda tersedia</option>
              <option v-for="bike in availableBikes" :key="bike.id_sepeda" :value="bike.id_sepeda">
                {{ bike.nama_sepeda }}
              </option>
            </select>
            <ChevronDown class="admin-select-icon" />
          </div>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Pelanggan</label>
          <div class="relative">
            <select v-model="form.id_pelanggan" class="admin-select">
              <option value="" disabled>Pilih pelanggan</option>
              <option v-for="p in pelanggan" :key="p.id_pelanggan" :value="p.id_pelanggan">
                {{ p.nama }} ({{ p.no_hp || 'tanpa HP' }})
              </option>
            </select>
            <ChevronDown class="admin-select-icon" />
          </div>
        </div>
        <div class="flex items-end">
          <BaseButton type="submit" full-width>Buat Sewa</BaseButton>
        </div>
      </form>
    </div>

    <BaseTable
      :columns="columns"
      :data="paginatedRentals"
      :loading="loading"
      row-key="id_penyewaan"
      :show-add="false"
      :show-actions="false"
      :show-search="false"
      :pagination="pagination"
      @page-change="setPage"
    >
      <template #cell-sepeda="{ row }">
        {{ row.sepeda?.nama_sepeda || '-' }}
      </template>
      <template #cell-pelanggan="{ row }">{{ row.pelanggan?.nama }}</template>
      <template #cell-waktu_sewa="{ value }">{{ formatDateTime(value) }}</template>
      <template #cell-batas_waktu="{ value }">{{ formatDateTime(value) }}</template>
      <template #cell-tarif="{ value }">{{ formatRupiah(value) }}</template>
      <template #cell-status_transaksi="{ value }">
        <span class="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{{ value }}</span>
      </template>
    </BaseTable>

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
import { ChevronDown } from 'lucide-vue-next'
import BaseButton from '@/components/Button/BaseButton.vue'
import BaseTable, { type TableColumn } from '@/components/Table/BaseTable.vue'
import Notification from '@/components/Modal/Notification.vue'
import { useClientPagination } from '@/composables/useClientPagination'
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
const columns: TableColumn[] = [
  { key: 'sepeda', label: 'Sepeda' },
  { key: 'pelanggan', label: 'Pelanggan' },
  { key: 'waktu_sewa', label: 'Waktu Sewa' },
  { key: 'batas_waktu', label: 'Batas Waktu' },
  { key: 'tarif', label: 'Tarif' },
  { key: 'status_transaksi', label: 'Status' },
]
const { pagination, paginatedData: paginatedRentals, setPage } = useClientPagination(activeRentals)
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

<style scoped>
.admin-select {
  appearance: none;
  width: 100%;
  height: 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background-color: #f8fafc;
  padding: 0 2.5rem 0 0.875rem;
  color: #334155;
  font-size: 0.875rem;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
}

.admin-select:hover {
  border-color: #a7f3d0;
  background-color: #fff;
}

.admin-select:focus {
  border-color: #10b981;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgb(16 185 129 / 0.12);
}

.admin-select-icon {
  position: absolute;
  top: 50%;
  right: 0.875rem;
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
