<template>
  <div class="space-y-4">
    <div>
      <h2 class="text-lg font-bold text-slate-900">Catat Pengembalian</h2>
      <p class="text-sm text-slate-500">Pilih kondisi sepeda saat dikembalikan.</p>
    </div>

    <BaseTable
      :columns="columns"
      :data="paginatedRentals"
      :loading="loading"
      row-key="id_penyewaan"
      :show-add="false"
      :show-edit="false"
      :show-delete="false"
      :show-search="false"
      :pagination="pagination"
      @page-change="setPage"
    >
      <template #cell-sepeda="{ row }">
        {{ row.sepeda?.nama_sepeda || '-' }}
      </template>
      <template #cell-pelanggan="{ row }">{{ row.pelanggan?.nama }}</template>
      <template #cell-batas_waktu="{ value }">{{ formatDateTime(value) }}</template>
      <template #row-actions="{ row }">
        <button
          type="button"
          @click="openReturn(row)"
          class="action-icon"
          title="Catat pengembalian"
          :aria-label="`Catat pengembalian transaksi ${row.id_penyewaan}`"
        >
          <CornerDownLeft class="h-4 w-4" />
        </button>
      </template>
    </BaseTable>

    <Transition name="modal">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5">
          <h3 class="text-lg font-bold text-slate-900">Pengembalian</h3>
          <p class="mt-1 text-sm text-slate-500">{{ selected?.sepeda?.nama_sepeda }} - {{ selected?.pelanggan?.nama }}</p>
          <form @submit.prevent="submitReturn" class="mt-4 space-y-4">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Kondisi Kembali</label>
              <div class="relative">
                <select v-model="form.kondisi_kembali" class="admin-select">
                  <option v-for="k in kondisiOptions" :key="k" :value="k">{{ k }}</option>
                </select>
                <ChevronDown class="admin-select-icon" />
              </div>
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
import { ChevronDown, CornerDownLeft } from 'lucide-vue-next'
import BaseButton from '@/components/Button/BaseButton.vue'
import BaseTable, { type TableColumn } from '@/components/Table/BaseTable.vue'
import Notification from '@/components/Modal/Notification.vue'
import { useClientPagination } from '@/composables/useClientPagination'
import { useNotification } from '@/composables/useNotification'
import { createPengembalian, getPenyewaan } from '@/service/hazza'

const activeRentals = ref<any[]>([])
const loading = ref(false)
const columns: TableColumn[] = [
  { key: 'sepeda', label: 'Sepeda' },
  { key: 'pelanggan', label: 'Pelanggan' },
  { key: 'batas_waktu', label: 'Batas Waktu' },
]
const { pagination, paginatedData: paginatedRentals, setPage } = useClientPagination(activeRentals)
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

.action-icon {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0.625rem;
  background: transparent;
  color: #059669;
  transition:
    background-color 0.15s,
    color 0.15s,
    transform 0.15s;
}

.action-icon:hover {
  transform: translateY(-1px);
  background: #ecfdf5;
  color: #047857;
}
</style>
