import { ref } from 'vue'

export const useFetch = (apiMethod = null, payload = null, timeout = 0) => {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const fetch = async (newPayload = null) => {
    try {
      isLoading.value = true
      error.value = null
      if (timeout) {
        setTimeout(async () => {
          data.value = await apiMethod(newPayload || payload)
        }, 2000)
      } else {
        data.value = await apiMethod(newPayload || payload)
      }
    } catch (errorRes) {
      data.value = null
      error.value = errorRes.response?.data
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
