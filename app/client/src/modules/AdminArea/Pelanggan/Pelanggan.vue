<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-900">Data Pelanggan</h2>
        <p class="text-sm text-slate-500">Input dan lihat data pelanggan penyewaan.</p>
      </div>
      <div class="flex gap-2">
        <input
          v-model="search"
          @keyup.enter="fetchPelanggan"
          placeholder="Cari nama, HP, atau identitas"
          class="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
        <BaseButton size="sm" @click="showForm = true">
          <template #icon-left><Plus class="h-4 w-4" /></template>
          Tambah Pelanggan
        </BaseButton>
      </div>
    </div>

    <div class="overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <SkeletonTable v-if="loading" :columns="5" :rows="6" />
      <table v-else class="min-w-full text-sm">
        <thead class="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">No HP</th>
            <th class="px-4 py-3">Alamat</th>
            <th class="px-4 py-3">No Identitas</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="pelanggan.length === 0">
            <td colspan="5" class="px-4 py-10 text-center text-slate-500">Belum ada data pelanggan.</td>
          </tr>
          <tr v-for="p in pelanggan" :key="p.id_pelanggan" class="transition-colors hover:bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ p.id_pelanggan }}</td>
            <td class="px-4 py-3">{{ p.nama }}</td>
            <td class="px-4 py-3">{{ p.no_hp || '-' }}</td>
            <td class="px-4 py-3">{{ p.alamat || '-' }}</td>
            <td class="px-4 py-3">{{ p.no_identitas || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
import { Plus } from 'lucide-vue-next'
import BaseButton from '@/components/Button/BaseButton.vue'
import Notification from '@/components/Modal/Notification.vue'
import SkeletonTable from '@/components/SkeletonTable/SkeletonTable.vue'
import { useNotification } from '@/composables/useNotification'
import { createPelanggan, getPelanggan } from '@/service/hazza'

const pelanggan = ref<any[]>([])
const loading = ref(false)
const search = ref('')
const showForm = ref(false)
const form = ref({ nama: '', no_hp: '', alamat: '', no_identitas: '' })

const {
  showNotification,
  notificationType,
  notificationMessage,
  displayNotification,
  hideNotification,
} = useNotification()

const fetchPelanggan = async () => {
  loading.value = true
  try {
    const res = await getPelanggan({ search: search.value || undefined })
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
