<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Daftar Sepeda</h2>
        <p class="text-sm text-slate-500">Kelola armada sepeda Hazza Bike.</p>
      </div>
      <div class="flex gap-2">
        <input
          v-model="search"
          @keyup.enter="fetchBikes"
          placeholder="Cari ID, nama, atau jenis"
          class="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
        <BaseButton size="sm" @click="openAdd">
          <template #icon-left><Plus class="h-4 w-4" /></template>
          Tambah Sepeda
        </BaseButton>
      </div>
    </div>

    <div class="overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <SkeletonTable v-if="loading" :columns="6" :rows="6" />
      <table v-else class="min-w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nama Sepeda</th>
            <th class="px-4 py-3">Jenis</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Kondisi</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="bikes.length === 0">
            <td colspan="6" class="px-4 py-10 text-center text-slate-500">Belum ada data sepeda.</td>
          </tr>
          <tr v-for="bike in bikes" :key="bike.id_sepeda" class="transition-colors hover:bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ bike.id_sepeda }}</td>
            <td class="px-4 py-3">{{ bike.nama_sepeda }}</td>
            <td class="px-4 py-3">{{ bike.jenis || '-' }}</td>
            <td class="px-4 py-3">
              <select
                :value="bike.status"
                @change="changeStatus(bike, $event)"
                class="rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
              </select>
            </td>
            <td class="px-4 py-3">
              <select
                :value="bike.kondisi"
                @change="changeKondisi(bike, $event)"
                class="rounded-xl border border-slate-200 bg-white px-2 py-1 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option v-for="k in kondisiOptions" :key="k" :value="k">{{ k }}</option>
              </select>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <BaseButton variant="secondary" size="sm" @click="openEdit(bike)">
                  <template #icon-left><Pencil class="h-4 w-4" /></template>
                  Edit
                </BaseButton>
                <BaseButton variant="danger" size="sm" @click="remove(bike)">
                  <template #icon-left><Trash2 class="h-4 w-4" /></template>
                  Hapus
                </BaseButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
import { Pencil, Plus, Trash2 } from 'lucide-vue-next'
import BaseButton from '@/components/Button/BaseButton.vue'
import Confirmation from '@/components/Modal/Confirmation.vue'
import Notification from '@/components/Modal/Notification.vue'
import SkeletonTable from '@/components/SkeletonTable/SkeletonTable.vue'
import { useConfirmation } from '@/composables/useConfirmation'
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

const fetchBikes = async () => {
  loading.value = true
  try {
    const res = await getSepeda({ search: search.value || undefined })
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
