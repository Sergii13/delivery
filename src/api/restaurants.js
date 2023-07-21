import axios from '@/api/axios'

export const getRestaurants = async () => {
  const response = await axios.get('providers/10/locations')
  return response.data.data
}
export const getRestaurantsPickup = async () => {
  const response = await axios.get('restaurants')
  return response.data.data
}
export const getRestaurantByAddress = async (payload) => {
  const response = await axios.post('restaurants/find/by_address', payload)
  return response.data.data
}
export const getFullMenu = async (params) => {
  const response = await axios.get(`menu/${params.id}`)
  return response.data.data
}
export const getProduct = async (params) => {
  const response = await axios.get(`menu/${params.rest_id}/products/${params.uniq_id}`)
  return response.data.data
}

export const getWorkedTimes = async (params) => {
  const payload = params.payload
  const response = await axios.post(`restaurants/${params.rest_id}/worked_times`, payload)
  return response.data.data
}
