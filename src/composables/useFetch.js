import { ref } from 'vue'

export const useFetch = (apiMethod = null, payload = null) => {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const fetch = async (newPayload = null) => {
    try {
      isLoading.value = true
      error.value = null
      data.value = await apiMethod(newPayload || payload)
    } catch (error) {
      error.value = error
    } finally {
      if (!apiMethod) {
        setTimeout(() => {
          isLoading.value = false
        }, 1500)
      } else {
        isLoading.value = false
      }
    }
  }

  return { data, isLoading, error, fetch }
}
