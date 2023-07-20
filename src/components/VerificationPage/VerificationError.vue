<script setup>
import ErrorIcon from '@/assets/img/success.svg'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function routeToVerify() {
  router.push({ name: 'verify' })
}
</script>
<template>
  <div class="verify__content">
    <h2 class="verify__title">Помилка</h2>
    <div class="verify__description tac">Спробуйте ще раз</div>
    <div class="verify__icon">
      <img :src="ErrorIcon" alt="" />
    </div>
    <ButtonApp @click="routeToVerify" :label="'Підтвердити номер телефону'" />
  </div>
</template>
