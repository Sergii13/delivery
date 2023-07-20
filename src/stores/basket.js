import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  addProduct as addProductApi,
  getBasket as getBasketApi,
  updateProduct as updateProductApi
} from '@/api/basket'

export const useBasketStore = defineStore('basket', () => {
  const basketInfo = ref(null)
  const customer = ref(null)
  const address = ref(null)
  const instance = ref('sasasasasasasaasssasa')
  const error = ref(null)
  const isLoading = ref(false)
  const isLoadingUpdate = ref(false)

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
    customer,
    totalCount,
    totalPrice,
    addProduct,
    removeProduct,
    getBasket,
    updateProduct,
    address
  }
})
