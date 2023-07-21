<script setup>
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import SuccessImg from '@/assets/img/success.svg'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import router from '@/router'

const basketStore = useBasketStore()
const { orderInfo } = storeToRefs(basketStore)

function routeToMenu() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="order-success">
    <div class="order-success__container">
      <div class="order-success__wrap">
        <template v-if="orderInfo">
          <div class="order-success__icon">
            <img :src="SuccessImg" alt="" />
          </div>
          <div class="order-success__title">Замовлення підтверджене</div>
          <div class="order-success__subtitle">Замовлення № {{ orderInfo.data.order_code }}</div>
          <div class="order-success__text">
            <p>
              До сплати: <br />
              <b>{{ orderInfo.data.prices.total_price }} грн</b> <br />
              Дякуємо за замовлення!
            </p>
          </div>
        </template>
        <div class="order-success__buttons">
          <ButtonApp @click="routeToMenu" :label="'Повернутись до меню'" />
        </div>
      </div>
    </div>
  </div>
</template>
