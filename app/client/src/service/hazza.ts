import api from './api'

export const getDashboard = () =>
  api.get('/dashboard/armada').then((r) => r.data)

export const getSepeda = (params?: Record<string, unknown>) =>
  api.get('/sepeda', { params }).then((r) => r.data)

export const createSepeda = (payload: Record<string, unknown>) =>
  api.post('/sepeda', payload).then((r) => r.data)

export const updateSepeda = (id: string, payload: Record<string, unknown>) =>
  api.put(`/sepeda/${id}`, payload).then((r) => r.data)

export const deleteSepeda = (id: string) =>
  api.delete(`/sepeda/${id}`).then((r) => r.data)

export const updateStatusSepeda = (id: string, status: string) =>
  api.patch(`/sepeda/${id}/status`, { status }).then((r) => r.data)

export const updateKondisiSepeda = (id: string, kondisi: string) =>
  api.patch(`/sepeda/${id}/kondisi`, { kondisi }).then((r) => r.data)

export const getPelanggan = (params?: Record<string, unknown>) =>
  api.get('/pelanggan', { params }).then((r) => r.data)

export const createPelanggan = (payload: Record<string, unknown>) =>
  api.post('/pelanggan', payload).then((r) => r.data)

export const getPenyewaan = (status?: string) =>
  api
    .get('/penyewaan', { params: status ? { status } : {} })
    .then((r) => r.data)

export const createPenyewaan = (payload: Record<string, unknown>) =>
  api.post('/penyewaan', payload).then((r) => r.data)

export const createPengembalian = (payload: Record<string, unknown>) =>
  api.post('/pengembalian', payload).then((r) => r.data)

export const getRiwayat = () => api.get('/riwayat').then((r) => r.data)
