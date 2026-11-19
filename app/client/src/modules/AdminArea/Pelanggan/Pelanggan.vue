<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Data Pelanggan</h2>
        <p class="text-sm text-slate-500">Input dan lihat data pelanggan penyewaan.</p>
      </div>
    </div>

    <BaseTable
      :columns="columns"
      :data="paginatedPelanggan"
      :loading="loading"
      row-key="id_pelanggan"
      search-placeholder="Cari nama, HP, atau identitas"
      :show-actions="false"
      add-label="Tambah Pelanggan"
      :pagination="pagination"
      @add="showForm = true"
      @search="fetchPelanggan"
      @page-change="setPage"
    >
    </BaseTable>

    <Transition name="modal">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5">
          <h3 class="text-lg font-bold text-slate-900">Tambah Pelanggan</h3>
          <form @submit.prevent="saveForm" class="mt-4 space-y-4">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Nama</label>
              <input v-model="form.nama" placeholder="Nama lengkap" class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">No HP</label>
              <input v-model="form.no_hp" placeholder="08xxxxxxxxxx" class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">Alamat</label>
              <textarea v-model="form.alamat" rows="2" placeholder="Alamat pelanggan" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"></textarea>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700">No Identitas</label>
              <input v-model="form.no_identitas" placeholder="KTP/SIM" class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm" />
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <BaseButton variant="secondary" size="sm" @click="showForm = false">Batal</BaseButton>
              <BaseButton type="submit" size="sm">Simpan</BaseButton>
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
import BaseTable, { type TableColumn } from '@/components/Table/BaseTable.vue'
import Notification from '@/components/Modal/Notification.vue'
import { useClientPagination } from '@/composables/useClientPagination'
import { useNotification } from '@/composables/useNotification'
import { createPelanggan, getPelanggan } from '@/service/hazza'


const pelanggan = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const columns: TableColumn[] = [
  { key: 'nama', label: 'Nama' },
  { key: 'no_hp', label: 'No HP' },
  { key: 'alamat', label: 'Alamat' },
  { key: 'no_identitas', label: 'No Identitas' },
]
const { pagination, paginatedData: paginatedPelanggan, setPage } = useClientPagination(pelanggan)
const showForm = ref(false)
const form = ref({ nama: '', no_hp: '', alamat: '', no_identitas: '' })

const {
  showNotification,
  notificationType,
  notificationMessage,
  displayNotification,
  hideNotification,
} = useNotification()

const fetchPelanggan = async (query = search.value) => {
  search.value = query
  loading.value = true
  try {
    const res = await getPelanggan({ search: query || undefined })
    pelanggan.value = res.data || []
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal memuat data pelanggan', 'error')
  } finally {
    loading.value = false
  }
}

const saveForm = async () => {
  if (!form.value.nama) {
    displayNotification('Nama pelanggan wajib diisi', 'error')
    return
  }

  try {
    await createPelanggan(form.value)
    showForm.value = false
    form.value = { nama: '', no_hp: '', alamat: '', no_identitas: '' }
    await fetchPelanggan()
    displayNotification('Pelanggan berhasil ditambahkan', 'success')
  } catch (e: any) {
    displayNotification(e.response?.data?.message || 'Gagal menyimpan data pelanggan', 'error')
  }
}

onMounted(fetchPelanggan)
</script>
