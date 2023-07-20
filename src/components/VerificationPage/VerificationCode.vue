<script setup>
import { ref, computed } from 'vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import LoaderApp from '@/components/shared/LoaderApp.vue'
import { useFetch } from '@/composables/useFetch'
import router from '@/router'
import VOtpInput from 'vue3-otp-input'

const { fetch, isLoading, data } = useFetch()
const bindModal = ref('')
const btnSend = ref(null)

const isVerify = ref(false)
const handleOnComplete = () => {
  btnSend.value.btnRef.focus()
  isVerify.value = true
}

async function resendCode() {
  await fetch()
}

async function sendNumber() {
  await fetch()
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
        <v-otp-input
          class="otp"
          ref="otpInput"
          v-model:value="bindModal"
          input-classes="otp-input"
          separator=""
          :num-inputs="4"
          :should-auto-focus="true"
          input-type="letter-numeric"
          :conditionalClass="['one', 'two', 'three', 'four']"
          :placeholder="['0', '0', '0', '0']"
          @on-complete="handleOnComplete"
        />
        <span @click="resendCode" class="verify__send-code"> Надіслати ще раз </span>
        <ButtonApp :verify="isVerify" ref="btnSend" label="Далі" />
      </template>
    </form>
  </div>
</template>
