<template>
  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-bold text-slate-900">Riwayat Transaksi</h2>
      <p class="text-sm text-slate-500">Gabungan data penyewaan dan pengembalian.</p>
    </div>

    <div class="overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <SkeletonTable v-if="loading" :columns="10" :rows="6" />
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
            <th class="px-4 py-3">Waktu Kembali</th>
            <th class="px-4 py-3">Kondisi Kembali</th>
            <th class="px-4 py-3">Catatan</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="riwayat.length === 0">
            <td colspan="10" class="px-4 py-10 text-center text-slate-500">Belum ada riwayat transaksi.</td>
          </tr>
          <tr v-for="r in riwayat" :key="r.id_penyewaan" class="transition-colors hover:bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ r.id_penyewaan }}</td>
            <td class="px-4 py-3">{{ r.sepeda?.nama_sepeda }} ({{ r.sepeda?.id_sepeda }})</td>
            <td class="px-4 py-3">{{ r.pelanggan?.nama }}</td>
            <td class="px-4 py-3">{{ formatDateTime(r.waktu_sewa) }}</td>
            <td class="px-4 py-3">{{ formatDateTime(r.batas_waktu) }}</td>
            <td class="px-4 py-3">{{ formatRupiah(r.tarif) }}</td>
            <td class="px-4 py-3">{{ r.status_transaksi }}</td>
            <td class="px-4 py-3">{{ formatDateTime(r.pengembalian?.waktu_kembali) }}</td>
            <td class="px-4 py-3">{{ r.pengembalian?.kondisi_kembali || '-' }}</td>
            <td class="px-4 py-3">{{ r.pengembalian?.catatan || '-' }}</td>
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
import { onMounted, ref } from 'vue'
import Notification from '@/components/Modal/Notification.vue'
import SkeletonTable from '@/components/SkeletonTable/SkeletonTable.vue'
import { useNotification } from '@/composables/useNotification'
import { getRiwayat } from '@/service/hazza'

const riwayat = ref<any[]>([])
const loading = ref(false)

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
