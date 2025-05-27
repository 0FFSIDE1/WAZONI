import api from '@/api/axios'

export const fetchVendorProducts = async (path) => {
  const { data } = await api.get(path)
  return data
}
export const createProduct = async (payload) => {
  const { data } = await api.post(`products/`, payload)
  return data
}
export const editVendorProduct = async (id, payload) => {
  const { data } = await api.patch(`products/${id}/`, payload)
  return data
}
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`products/${id}/`)
  return data
}