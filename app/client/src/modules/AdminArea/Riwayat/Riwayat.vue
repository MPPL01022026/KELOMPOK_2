<template>
  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-bold text-slate-900">Riwayat Transaksi</h2>
      <p class="text-sm text-slate-500">Gabungan data penyewaan dan pengembalian.</p>
    </div>

    <BaseTable
      :columns="columns"
      :data="paginatedRiwayat"
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
      <template #cell-waktu_kembali="{ row }">{{ formatDateTime(row.pengembalian?.waktu_kembali) }}</template>
      <template #cell-kondisi_kembali="{ row }">{{ row.pengembalian?.kondisi_kembali || '-' }}</template>
      <template #cell-catatan="{ row }">{{ row.pengembalian?.catatan || '-' }}</template>
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
import { onMounted, ref } from 'vue'
import BaseTable, { type TableColumn } from '@/components/Table/BaseTable.vue'
import Notification from '@/components/Modal/Notification.vue'
import { useClientPagination } from '@/composables/useClientPagination'
import { useNotification } from '@/composables/useNotification'
import { getRiwayat } from '@/service/hazza'

const riwayat = ref<any[]>([])
const loading = ref(false)
const columns: TableColumn[] = [
  { key: 'sepeda', label: 'Sepeda' },
  { key: 'pelanggan', label: 'Pelanggan' },
  { key: 'waktu_sewa', label: 'Waktu Sewa' },
  { key: 'batas_waktu', label: 'Batas Waktu' },
  { key: 'tarif', label: 'Tarif' },
  { key: 'status_transaksi', label: 'Status' },
  { key: 'waktu_kembali', label: 'Waktu Kembali' },
  { key: 'kondisi_kembali', label: 'Kondisi Kembali' },
  { key: 'catatan', label: 'Catatan' },
]
const { pagination, paginatedData: paginatedRiwayat, setPage } = useClientPagination(riwayat)

const { showNotification, notificationType, notificationMessage, displayNotification, hideNotification } = useNotification()

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getRiwayat()
    riwayat.value = res.data || []
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memuat riwayat', 'error')
  } finally {
    loading.value = false
  }
}

const formatDateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'

const formatRupiah = (value: number) => `Rp ${Number(value || 0).toLocaleString('id-ID')}`

onMounted(fetchData)
</script>
