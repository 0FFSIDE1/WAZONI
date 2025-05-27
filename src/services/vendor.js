import api from '@/api/axios'

export const fetchVendorInfo = async () => {
  const { data } = await api.get('vendor/profile/')
  return data
}

export const fetchVendorStats = async (id) => {
  const { data } = await api.get(`vendor/${id}/stats/`)
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
