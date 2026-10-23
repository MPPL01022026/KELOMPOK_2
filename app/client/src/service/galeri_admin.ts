import api from './api'

export const getGaleri = async (params: any) => {
  try {
    const response = await api.post('/galeri/list', params)
    return response.data
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}
