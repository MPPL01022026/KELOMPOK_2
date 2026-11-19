<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Daftar Sepeda</h2>
        <p class="text-sm text-slate-500">Kelola armada sepeda Hazza Bike.</p>
      </div>
    </div>

    <BaseTable
      :columns="columns"
      :data="paginatedBikes"
      :loading="loading"
      row-key="id_sepeda"
      add-label="Tambah Sepeda"
      search-placeholder="Cari nama atau jenis sepeda"
      :pagination="pagination"
      @add="openAdd"
      @search="fetchBikes"
      @page-change="setPage"
    >
      <template #cell-status="{ row }">
        <div class="relative w-40">
          <select
            :value="row.status"
            :aria-label="`Status sepeda ${row.id_sepeda}`"
            @change="changeStatus(row, $event)"
            class="admin-select"
          >
            <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
          <ChevronDown class="admin-select-icon" />
        </div>
      </template>
      <template #cell-kondisi="{ row }">
        <div class="relative w-44">
          <select
            :value="row.kondisi"
            :aria-label="`Kondisi sepeda ${row.id_sepeda}`"
            @change="changeKondisi(row, $event)"
            class="admin-select"
          >
            <option v-for="kondisi in kondisiOptions" :key="kondisi" :value="kondisi">{{ kondisi }}</option>
          </select>
          <ChevronDown class="admin-select-icon" />
        </div>
      </template>
      <template #row-actions="{ row }">
        <button
          type="button"
          @click="openEdit(row)"
          class="action-icon action-icon-edit"
          title="Edit sepeda"
          :aria-label="`Edit sepeda ${row.id_sepeda}`"
        >
          <Pencil class="h-4 w-4" />
        </button>
        <button
          type="button"
          @click="remove(row)"
          class="action-icon action-icon-delete"
          title="Hapus sepeda"
          :aria-label="`Hapus sepeda ${row.id_sepeda}`"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </template>
    </BaseTable>

    <Transition name="modal">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5">
          <h3 class="text-lg font-bold text-slate-900">{{ editing ? 'Edit Sepeda' : 'Tambah Sepeda' }}</h3>
          <form @submit.prevent="saveForm" class="mt-4 space-y-4">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">ID Sepeda</label>
              <input
                v-model="form.id_sepeda"
                :disabled="!!editing"
                placeholder="Contoh: HZB-001"
                class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm disabled:bg-slate-100"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Nama Sepeda</label>
              <input
                v-model="form.nama_sepeda"
                placeholder="Contoh: Seli Urban Fold"
                class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Jenis</label>
              <input
                v-model="form.jenis"
                placeholder="Contoh: Sepeda Lipat"
                class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
              />
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <BaseButton variant="secondary" size="sm" @click="showForm = false">Batal</BaseButton>
              <BaseButton type="submit" size="sm">Simpan</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <Confirmation :show-confirm-dialog="showConfirmDialog" :confirm-title="confirmTitle" :confirm-message="confirmMessage">
      <BaseButton variant="secondary" size="sm" @click="cancel">Tidak</BaseButton>
      <BaseButton variant="danger" size="sm" @click="confirm">Ya</BaseButton>
    </Confirmation>

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
import { ChevronDown, Pencil, Trash2 } from 'lucide-vue-next'
import BaseButton from '@/components/Button/BaseButton.vue'
import BaseTable, { type TableColumn } from '@/components/Table/BaseTable.vue'
import Confirmation from '@/components/Modal/Confirmation.vue'
import Notification from '@/components/Modal/Notification.vue'
import { useConfirmation } from '@/composables/useConfirmation'
import { useClientPagination } from '@/composables/useClientPagination'
import { useNotification } from '@/composables/useNotification'
import {
  createSepeda,
  deleteSepeda,
  getSepeda,
  updateKondisiSepeda,
  updateSepeda,
  updateStatusSepeda,
} from '@/service/hazza'

const bikes = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const columns: TableColumn[] = [
  { key: 'nama_sepeda', label: 'Nama Sepeda' },
  { key: 'jenis', label: 'Jenis' },
  { key: 'status', label: 'Status' },
  { key: 'kondisi', label: 'Kondisi' },
]
const { pagination, paginatedData: paginatedBikes, setPage } = useClientPagination(bikes)
const showForm = ref(false)
const editing = ref<any | null>(null)
const form = ref({ id_sepeda: '', nama_sepeda: '', jenis: '' })
const statusOptions = ['Tersedia', 'Disewa', 'Tidak Tersedia']
const kondisiOptions = ['Baik', 'Perlu Perawatan', 'Rusak']

const {
  showNotification,
  notificationType,
  notificationMessage,
  displayNotification,
  hideNotification,
} = useNotification()

const {
  showConfirmDialog,
  confirmTitle,
  confirmMessage,
  displayConfirmation,
  confirm,
  cancel,
} = useConfirmation()

const fetchBikes = async (query = search.value) => {
  search.value = query
  loading.value = true
  try {
    const res = await getSepeda({ search: query || undefined })
    bikes.value = res.data || []
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memuat data sepeda', 'error')
  } finally {
    loading.value = false
  }
}

const openAdd = () => {
  editing.value = null
  form.value = { id_sepeda: '', nama_sepeda: '', jenis: '' }
  showForm.value = true
}

const openEdit = (bike: any) => {
  editing.value = bike
  form.value = { id_sepeda: bike.id_sepeda, nama_sepeda: bike.nama_sepeda, jenis: bike.jenis || '' }
  showForm.value = true
}

const saveForm = async () => {
  if (!form.value.nama_sepeda) {
    displayNotification('Nama sepeda wajib diisi', 'error')
    return
  }
  if (!editing.value && !form.value.id_sepeda) {
    displayNotification('ID sepeda wajib diisi', 'error')
    return
  }

  try {
    if (editing.value) {
      await updateSepeda(editing.value.id_sepeda, {
        nama_sepeda: form.value.nama_sepeda,
        jenis: form.value.jenis,
      })
    } else {
      await createSepeda({
        id_sepeda: form.value.id_sepeda,
        nama_sepeda: form.value.nama_sepeda,
        jenis: form.value.jenis,
      })
    }
    showForm.value = false
    await fetchBikes()
    displayNotification(editing.value ? 'Sepeda berhasil diperbarui' : 'Sepeda berhasil ditambahkan', 'success')
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal menyimpan data sepeda', 'error')
  }
}

const remove = (bike: any) => {
  displayConfirmation(
    'Hapus Sepeda',
    `Apakah Anda yakin ingin menghapus sepeda <b>${bike.id_sepeda}</b>?`,
    async () => {
      try {
        await deleteSepeda(bike.id_sepeda)
        await fetchBikes()
        displayNotification('Sepeda berhasil dihapus', 'success')
      } catch (e: any) {
        displayNotification(e.response?.data?.message || 'Gagal menghapus sepeda', 'error')
      }
    },
  )
}

const changeStatus = async (bike: any, event: Event) => {
  const status = (event.target as HTMLSelectElement).value
  try {
    await updateStatusSepeda(bike.id_sepeda, status)
    await fetchBikes()
    displayNotification('Status sepeda berhasil diperbarui', 'success')
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memperbarui status', 'error')
  }
}

const changeKondisi = async (bike: any, event: Event) => {
  const kondisi = (event.target as HTMLSelectElement).value
  try {
    await updateKondisiSepeda(bike.id_sepeda, kondisi)
    await fetchBikes()
    displayNotification('Kondisi sepeda berhasil diperbarui', 'success')
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memperbarui kondisi', 'error')
  }
}

onMounted(fetchBikes)
</script>

<style scoped>
.admin-select {
  appearance: none;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background-color: #fff;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  color: #334155;
  font-size: 0.8125rem;
  font-weight: 500;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
}

.admin-select:hover {
  border-color: #a7f3d0;
  background-color: #fafffd;
}

.admin-select:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgb(16 185 129 / 0.12);
}

.admin-select-icon {
  position: absolute;
  top: 50%;
  right: 0.75rem;
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
  color: #64748b;
  transition:
    background-color 0.15s,
    color 0.15s,
    transform 0.15s;
}

.action-icon:hover {
  transform: translateY(-1px);
}

.action-icon-edit:hover {
  background: #fffbeb;
  color: #d97706;
}

.action-icon-delete:hover {
  background: #fef2f2;
  color: #dc2626;
}
</style>
