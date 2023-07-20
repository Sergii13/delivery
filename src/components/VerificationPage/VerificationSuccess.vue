<script setup>
import SuccessIcon from '@/assets/img/success.svg'
import { onMounted } from 'vue'
import router from '@/router'

onMounted(() => {
  setTimeout(() => {
    router.push({ name: 'order' })
  }, 2000)
})
</script>
<template>
  <div class="verify__content">
    <h2 class="verify__title">Верифікація успішна</h2>
    <div class="verify__description tac">Дякуємо!</div>
    <div class="verify__icon">
      <img :src="SuccessIcon" alt="" />
    </div>
  </div>
</template>
