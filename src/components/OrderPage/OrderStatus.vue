<script setup>
import LoaderApp from '@/components/shared/LoaderApp.vue'
import { onMounted } from 'vue'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const basketStore = useBasketStore()
const { isOnlinePayment, orderInfo, basketInfo } = storeToRefs(basketStore)
const router = useRouter()

function goPay() {
  if (orderInfo.value?.message) {
    console.log(orderInfo.value.message.url)
    window.location.href = orderInfo.value.message.url
  } else {
    // $('#pay_form').html(this.response.form)
    // $('#pay_form').find('form').submit()
  }
}

onMounted(() => {
  basketInfo.value = null
  setTimeout(() => {
    if (!isOnlinePayment.value) {
      router.push({ name: 'order-success' })
    } else {
      goPay()
    }
  }, 2000)
})
</script>
<template>
  <div class="order-status">
    <div class="order-status__container">
      <LoaderApp />
      <div class="order-status__title">Чекаємо підтвердження</div>
      <div class="order-status__description">
        <p>
          Заклад оформлює замовлення, <br />
          будь ласка дочекайтесь резульату
        </p>
      </div>
      <div class="order-status__line">
        <span> </span>
      </div>
    </div>
  </div>
</template>
