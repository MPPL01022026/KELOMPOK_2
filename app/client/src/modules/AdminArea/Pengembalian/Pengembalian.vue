<template>
  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-bold text-slate-900">Catat Pengembalian</h2>
      <p class="text-sm text-slate-500">Pilih kondisi sepeda saat dikembalikan.</p>
    </div>

    <div class="overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <SkeletonTable v-if="loading" :columns="5" :rows="5" />
      <table v-else class="min-w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Sepeda</th>
            <th class="px-4 py-3">Pelanggan</th>
            <th class="px-4 py-3">Batas Waktu</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="activeRentals.length === 0">
            <td colspan="5" class="px-4 py-10 text-center text-slate-500">Tidak ada sewa yang perlu dikembalikan.</td>
          </tr>
          <tr v-for="r in activeRentals" :key="r.id_penyewaan" class="transition-colors hover:bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ r.id_penyewaan }}</td>
            <td class="px-4 py-3">{{ r.sepeda?.nama_sepeda }} ({{ r.sepeda?.id_sepeda }})</td>
            <td class="px-4 py-3">{{ r.pelanggan?.nama }}</td>
            <td class="px-4 py-3">{{ formatDateTime(r.batas_waktu) }}</td>
            <td class="px-4 py-3">
              <BaseButton size="sm" @click="openReturn(r)">Kembalikan</BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Transition name="modal">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5">
          <h3 class="text-lg font-bold text-slate-900">Pengembalian</h3>
          <p class="mt-1 text-sm text-slate-500">{{ selected?.sepeda?.nama_sepeda }} - {{ selected?.pelanggan?.nama }}</p>
          <form @submit.prevent="submitReturn" class="mt-4 space-y-4">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Kondisi Kembali</label>
              <select v-model="form.kondisi_kembali" class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm">
                <option v-for="k in kondisiOptions" :key="k" :value="k">{{ k }}</option>
              </select>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Catatan</label>
              <textarea v-model="form.catatan" rows="3" placeholder="Catatan opsional" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"></textarea>
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <BaseButton variant="secondary" size="sm" @click="showForm = false">Batal</BaseButton>
              <BaseButton type="submit" size="sm">Simpan Pengembalian</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Transition>

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
import BaseButton from '@/components/Button/BaseButton.vue'
import Notification from '@/components/Modal/Notification.vue'
import SkeletonTable from '@/components/SkeletonTable/SkeletonTable.vue'
import { useNotification } from '@/composables/useNotification'
import { createPengembalian, getPenyewaan } from '@/service/hazza'

const activeRentals = ref<any[]>([])
const loading = ref(false)
const showForm = ref(false)
const selected = ref<any | null>(null)
const kondisiOptions = ['Baik', 'Perlu Perawatan', 'Rusak']
const form = ref({ kondisi_kembali: 'Baik', catatan: '' })

const { showNotification, notificationType, notificationMessage, displayNotification, hideNotification } = useNotification()

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getPenyewaan('Berjalan')
    activeRentals.value = res.data || []
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memuat data', 'error')
  } finally {
    loading.value = false
  }
}

const openReturn = (rental: any) => {
  selected.value = rental
  form.value = { kondisi_kembali: 'Baik', catatan: '' }
  showForm.value = true
}

const submitReturn = async () => {
  if (!selected.value) return
  try {
    await createPengembalian({
      id_penyewaan: selected.value.id_penyewaan,
      kondisi_kembali: form.value.kondisi_kembali,
      catatan: form.value.catatan,
    })
    showForm.value = false
    selected.value = null
    await fetchData()
    displayNotification('Pengembalian berhasil dicatat', 'success')
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal mencatat pengembalian', 'error')
  }
}

const formatDateTime = (value: string) =>
  value ? new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'

onMounted(fetchData)
</script>
