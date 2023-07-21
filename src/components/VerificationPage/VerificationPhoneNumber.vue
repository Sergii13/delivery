<script setup>
import { ref, computed } from 'vue'
import InputApp from '@/components/shared/ui/InputApp.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import LoaderApp from '@/components/shared/LoaderApp.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import { useRouter } from 'vue-router'

const { fetch, isLoading, data } = useFetch()

const phoneNumber = ref('')

const isVerifyNumber = computed(() => {
  return validatePhoneNumber(phoneNumber.value)
})

function validatePhoneNumber(number) {
  const phoneNumberWithoutSpaces = number.replace(/\s/g, '')
  const phoneNumberRegex = /^\+380\d{9}$/
  return phoneNumberRegex.test(phoneNumberWithoutSpaces)
}

async function sendNumber() {
  await fetch()
  setTimeout(() => {
    router.push({ name: 'enterCode' })
  }, 1500)
}
</script>
<template>
  <div class="verify__content">
    <h2 class="verify__title">Верифікація</h2>
    <div class="verify__description">
      Для оформлення замовлення вкажіть будь ласка ваш номер телефону
    </div>
    <form @submit.prevent="sendNumber" action="#" class="verify__form">
      <LoaderApp v-if="isLoading" />
      <template v-else>
        <InputApp
          :type="'tel'"
          :mask="'+38 0## ### ## ##'"
          :placeholder="'+38 000 000 00 00'"
          v-model="phoneNumber"
        />
        <ButtonApp :verify="isVerifyNumber" label="Далі" />
      </template>
    </form>
  </div>
</template>
