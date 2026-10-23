import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '@/modules/UserArea/index.vue'
import Home from '@/modules/UserArea/Home.vue'
import Login from '@/modules/AdminArea/Login/Login.vue'
import Template from '@/modules/AdminArea/Templating/Template.vue'

const routes = [
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '', component: Home },
    ],
  },


  { path: '/login', component: Login },

  {
    path: '/admin-area',
    component: Template,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.path === '/login' && token) {
    return next('/admin-area')
  }

  next()
})

export default router
