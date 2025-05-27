import api from '@/api/axios'

export const fetchNotifications = async (url) => {
  const baseUrl = import.meta.env.VITE_API_URL; 
  const finalUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : `${baseUrl}notifications/`
  const { data } = await api.get(finalUrl)
  return data
}

export const updateNotification = async (id, data) => {
  const { data: response } = await api.patch(`notifications/${id}/`, data)
  console.log('Updated notification:', response)
  return response
}
export const markAllNotificationsAsRead = async () => {
  const { data } = await api.patch('notifications/mark-all-read/')
  return data
}