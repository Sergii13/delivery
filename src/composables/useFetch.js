import { ref } from 'vue'

export const useFetch = (apiMethod, payload) => {
  const data = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetch = async () => {
    try {
      isLoading.value = true
      error.value = null
      data.value = await apiMethod(payload)
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetch }
}
