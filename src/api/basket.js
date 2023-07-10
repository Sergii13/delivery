import axios from '@/api/axios'

export const getBasket = async (instance) => {
  const response = await axios.get(`cart/${instance}`)
  return response.data
}

export const addProduct = async (instance, prod_id, payload) => {
  const payloadString = JSON.stringify(payload)
  const response = await axios.get(`cart/${instance}/${prod_id}`, payloadString)
  return response.data
}
