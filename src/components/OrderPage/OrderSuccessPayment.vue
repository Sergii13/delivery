<script setup>
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import SuccessImg from '@/assets/img/success.svg'
import router from '@/router'

function routeToMenu() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="order-success">
    <div class="order-success__container">
      <div class="order-success__wrap">
        <div class="order-success__icon">
          <img :src="SuccessImg" alt="" />
        </div>
        <div class="order-success__title">Оплата успішна</div>
        <div class="order-success__subtitle">Замовлення № 346FY9</div>
        <div class="order-success__text">
          <p>
            Орієнтовний час доставки <br />
            40 хвилин. <br />
            Дякуємо за замовлення!
          </p>
        </div>
        <div class="order-success__buttons">
          <ButtonApp :label="'Завантажити чек'" :type="'border-white'" />
          <ButtonApp @click="routeToMenu" :label="'Повернутись до меню'" />
        </div>
      </div>
    </div>
  </div>
</template>
