// src/modules/AdminArea/pages.ts

import DashboardPage from '@/modules/AdminArea/Dashboard/Dasgboard.vue'
import Gallery from '@/modules/AdminArea/Gallery/Gallery.vue'
// import UsersPage from '@/modules/AdminArea/Users/Users.vue'
// import ProductsPage from '@/modules/AdminArea/Products/Products.vue'
// import OrdersPage from '@/modules/AdminArea/Orders/Orders.vue'
// import SettingsPage from '@/modules/AdminArea/Settings/Settings.vue'

export const pages = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'home',
    component: DashboardPage,
  },
  {
    id: 'galeri',
    label: 'Galeri',
    icon: 'gallery',
    component: Gallery,
  },
]
