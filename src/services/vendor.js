import api from '@/api/axios'

export const fetchVendorInfo = async () => {
  const { data } = await api.get('vendor/profile/')
  return data
}

export const fetchVendorStats = async (id) => {
  const { data } = await api.get(`vendor/${id}/stats/`)
  return data
}

export const fetchVendorProducts = async () => {
  const { data } = await api.get('products/')
  return data
}

export const fetchVendorOrders = async () => {
  const { data } = await api.get('order/vendor/')
  return data
}

export const fetchVendorParcel = async () => {
  const { data } = await api.get('parcel/')
  return data
}

export const fetchVendorTransactions = async () => {
  const { data } = await api.get('transactions/')
  return data
}

export const fetchVendorNotifications = async (url) => {
  const baseUrl = import.meta.env.VITE_API_URL; 
  const finalUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : `${baseUrl}notifications/`
  const { data } = await api.get(finalUrl)
  return data
}