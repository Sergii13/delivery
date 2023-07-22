<script setup>
import { computed, ref } from 'vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import LoaderApp from '@/components/shared/LoaderApp.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import OtpApp from '@/components/shared/OtpApp.vue'
import { updateInstance } from '@/api/basket'
import { auditInstance } from '@/utils/helpers/uuid'
import { useBasketStore } from '@/stores/basket'

const { fetch, isLoading } = useFetch()
const {
  data: dataInstance,
  fetch: fetchUpdateInstance,
  isLoading: isLoadingInstance
} = useFetch(updateInstance)
const otpValue = ref('')
const btnSend = ref(null)

const handleOnComplete = () => {
  btnSend.value.btnRef.focus()
}
const isVerify = computed(() => {
  return otpValue.value.length === 4
})

async function resendCode() {
  await fetch()
}

const basketStore = useBasketStore()

async function sendNumber() {
  await fetch()
  const newInstance = localStorage.getItem('phoneNumber') ? localStorage.getItem('phoneNumber') : ''
  await fetchUpdateInstance({ instance: auditInstance(), new_instance: newInstance })
  if (dataInstance) {
    auditInstance(newInstance)
    basketStore.setInstance(newInstance)
  }
  router.push({ name: 'success' })
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
        <OtpApp
          @on-complete="handleOnComplete"
          @update:otp="otpValue = $event"
          :digit-count="4"
        ></OtpApp>

        <span @click="resendCode" class="verify__send-code"> Надіслати ще раз </span>
        <ButtonApp :verify="isVerify" ref="btnSend" label="Далі" />
      </template>
    </form>
  </div>
</template>
