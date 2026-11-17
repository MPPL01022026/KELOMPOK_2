import DashboardPage from '@/modules/AdminArea/Dashboard/Dasgboard.vue'
import SepedaPage from '@/modules/AdminArea/Sepeda/Sepeda.vue'
import PelangganPage from '@/modules/AdminArea/Pelanggan/Pelanggan.vue'
import PenyewaanPage from '@/modules/AdminArea/Penyewaan/Penyewaan.vue'
import PengembalianPage from '@/modules/AdminArea/Pengembalian/Pengembalian.vue'
import RiwayatPage from '@/modules/AdminArea/Riwayat/Riwayat.vue'

export const pages = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    component: DashboardPage,
  },
  {
    id: 'sepeda',
    label: 'Sepeda',
    icon: 'sepeda',
    component: SepedaPage,
  },
  {
    id: 'pelanggan',
    label: 'Pelanggan',
    icon: 'pelanggan',
    component: PelangganPage,
  },
  {
    id: 'penyewaan',
    label: 'Penyewaan',
    icon: 'penyewaan',
    component: PenyewaanPage,
  },
  {
    id: 'pengembalian',
    label: 'Pengembalian',
    icon: 'pengembalian',
    component: PengembalianPage,
  },
  {
    id: 'riwayat',
    label: 'Riwayat',
    icon: 'riwayat',
    component: RiwayatPage,
  },
]
