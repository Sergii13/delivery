import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  addProduct as addProductApi,
  getBasket as getBasketApi,
  updateProduct as updateProductApi
} from '@/api/basket'
import { auditInstance } from '@/utils/helpers/uuid'

export const useBasketStore = defineStore('basket', () => {
  const basketInfo = ref(null)
  const customer = ref(null)
  const address = ref(null)
  const instance = ref(auditInstance())
  const error = ref(null)
  const isLoading = ref(false)
  const isLoadingUpdate = ref(false)
  const orderInfo = ref(null)

  const isBasketEmpty = computed(() => {
    return basketInfo.value?.data.count === 0 || !basketInfo.value
  })

  const totalPrice = computed(() => {
    let price = 0
    if (basketInfo.value?.data) {
      price = Number(basketInfo.value?.data.total)
    }
    return price
  })
  const totalCount = computed(() => {
    if (basketInfo.value?.data) {
      return basketInfo.value.data.count
    } else return 0
  })
  const productItems = computed(() => {
    if (basketInfo.value?.data) {
      return basketInfo.value.data.items
    } else return []
  })
  const isOnlinePayment = computed(() => {
    if (orderInfo.value?.data) {
      return orderInfo.value?.data.is_pay_online
    } else {
      return null
    }
  })

  function setInstance(newInstance) {
    instance.value = newInstance
  }

  function setOrderInfo(payload) {
    orderInfo.value = payload
  }

  async function getBasket() {
    try {
      isLoading.value = true
      basketInfo.value = await getBasketApi(instance.value)
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  async function addProduct(product, newOptions) {
    try {
      const payload = {
        qty: product.quantity,
        rest_id: 5089,
        options: newOptions
      }
      isLoading.value = true

      basketInfo.value = await addProductApi(instance.value, product.id, payload)
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  async function updateProduct(cart_id, newCount, newOptions = []) {
    try {
      const payload = {
        qty: newCount,
        rest_id: 5089,
        options: newOptions
      }
      isLoadingUpdate.value = true
      basketInfo.value = await updateProductApi(instance.value, cart_id, payload)
    } catch (error) {
      error.value = error
    } finally {
      isLoadingUpdate.value = false
    }
  }

  function removeProduct(id) {
    productItems.value = productItems.value.filter((item) => item.id !== id)
  }

  return {
    productItems,
    isBasketEmpty,
    basketInfo,
    error,
    isLoading,
    isLoadingUpdate,
    orderInfo,
    customer,
    totalCount,
    isOnlinePayment,
    totalPrice,
    addProduct,
    setOrderInfo,
    removeProduct,
    getBasket,
    updateProduct,
    setInstance,
    address
  }
})
