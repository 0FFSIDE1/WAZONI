import api from '@/api/axios'

export const CreateParcel = async (payload) => {
    const { data } = await api.post('parcel/create/', payload)
    return data
}

export const fetchVendorParcel = async () => {
  const { data } = await api.get('parcel/')
  return data
}

export const getTrackingLog = async (trackingNo) => {
  const { data } = await api.get(`parcel/${trackingNo}/`)
  return data
}
