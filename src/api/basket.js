import axios from '@/api/axios'

export const getBasket = async (instance) => {
  const response = await axios.get(`cart/${instance}`)
  return response.data
}

export const addProduct = async (instance, prod_id, payload) => {
  const response = await axios.put(`cart/${instance}/${prod_id}`, payload)
  return response.data
}
export const updateProduct = async (instance, cart_id, payload) => {
  const response = await axios.post(`cart/${instance}/${cart_id}`, payload)
  return response.data
}

export const getShippings = async () => {
  const response = await axios.get('cart/getorder_shippings')
  return response.data
}

export const getPayments = async () => {
  const response = await axios.get('cart/getorder_payments')
  return response.data.data
}
export const getCustomerFields = async () => {
  const response = await axios.get('cart/customer_fields')
  return response.data.data
}
export const getAddressFields = async () => {
  const response = await axios.get('cart/address_fields')
  return response.data.data
}
export const orderClose = async (params) => {
  const response = await axios.post(`cart/${params.instance}/close`, params.payload)
  return response.data
}
export const updateInstance = async (params) => {
  const response = await axios.patch(`cart/${params.instance}/${params.new_instance}`)
  return response.data
}
