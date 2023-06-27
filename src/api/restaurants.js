import axios from '@/api/axios'

export const getRestaurants = async () => {
  const response = await axios.get('providers/10/locations')
  return response.data.data
}
export const getFullMenu = async (params) => {
  const response = await axios.get(`menu/${params.id}`)
  return response.data.data
}
