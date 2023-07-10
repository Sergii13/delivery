import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import isEqual from 'lodash.isequal'
import { getBasket as getBasketApi, addProduct as addProductApi } from '@/api/basket'

export const useBasketStore = defineStore('basket', () => {
  const productItems = ref([])
  const basketInfo = ref(null)
  const customer = ref(null)
  const address = ref(null)
  const instance = ref('GA1.2.1942560258.1687156614')
  const error = ref(null)
  const isLoading = ref(false)

  const isBasketEmpty = computed(() => {
    return productItems.value.length === 0
  })

  const totalPrice = computed(() => {
    let price = 0
    if (productItems.value.length > 0) {
      productItems.value.forEach((itemProduct) => {
        let productModifiersTotalPrice = 0
        if (itemProduct.modifiers.length > 0) {
          productModifiersTotalPrice = itemProduct.modifiers.reduce(
            (acc, currentModifier) => acc + currentModifier.totalPrice,
            productModifiersTotalPrice
          )
        }
        price += (itemProduct.price + productModifiersTotalPrice) * itemProduct.quantity
      })
    }
    return price
  })
  const totalCount = computed(() => {
    if (productItems.value.length > 0) {
      return productItems.value.reduce((acc, current) => current.quantity + acc, 0)
    } else return 0
  })

  async function getBasket(instanceValue) {
    try {
      isLoading.value = true
      const response = await getBasketApi(instanceValue)
      basketInfo.value = response
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  function addProduct(newProduct) {
    if (productItems.value.length > 0) {
      const productIndex = productItems.value.findIndex(
        (item) => item.id === newProduct.id && isEqual(newProduct.modifiers, item.modifiers)
      )
      if (productIndex >= 0) {
        productItems.value[productIndex].quantity += newProduct.quantity
      } else {
        productItems.value.push(newProduct)
      }
    } else {
      productItems.value.push(newProduct)
    }
  }

  function removeProduct(id) {
    productItems.value = productItems.value.filter((item) => item.id !== id)
  }

  return {
    productItems,
    isBasketEmpty,
    customer,
    totalCount,
    totalPrice,
    addProduct,
    removeProduct,
    address
  }
})
