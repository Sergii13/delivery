import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', () => {
  const orderItems = ref([])
  const customer = ref(null)
  const adress = ref(null)

  return { orderItems, customer, adress }
})
