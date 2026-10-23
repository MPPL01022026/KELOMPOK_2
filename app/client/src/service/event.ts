import api from './api'

export const getAllEvents = async () => {
  try {
    const response = await api.get('/event/daftar_event')
    return response.data
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}
