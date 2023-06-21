import axios from '@/api/axios'

export const getRestaurants = async () => {
  const response = await axios.get('providers/10/locations')
  return response.data.data
}
