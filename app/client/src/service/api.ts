import axios from 'axios'
import router from '@/router'

// ============================
// 🔥 SETUP AXIOS INSTANCE
// ============================
const api = axios.create({
  baseURL: 'http://localhost:3001', // backend kamu
  timeout: 10000,
})

// ============================
// 🔥 REQUEST INTERCEPTOR
// ============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    // Jika ada token, otomatis disisipkan di headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// ============================
// 🔥 RESPONSE INTERCEPTOR
// ============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token invalid / expired / unauthorized
    if (error.response?.status === 401) {
      // Hapus data user
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Redirect ke login
      router.push('/login')
    }

    return Promise.reject(error)
  },
)

export default api
