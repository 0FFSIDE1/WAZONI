import api from '@/api/axios'

export const fetchVendorInfo = async () => {
  const { data } = await api.get('vendor/profile')
  return data
}

export const fetchVendorStats = async (id) => {
  const { data } = await api.get(`vendor/${id}/stats`)
  return data
}

export const fetchVendorProducts = async () => {
  const { data } = await api.get('vendor/products')
  return data
}