<script setup>
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import SuccessImg from '@/assets/img/success.svg'
</script>

<template>
  <div class="order-success">
    <div class="order-success__container">
      <div class="order-success__icon">
        <img :src="SuccessImg" alt="" />
      </div>
      <div class="order-success__title">Замовлення підтверджене</div>
      <div class="order-success__subtitle">Замовлення № 346FY9</div>
      <div class="order-success__text">
        <p>
          До сплати: <br />
          <b>459 грн</b> <br />
          Дякуємо за замовлення!
        </p>
      </div>
      <div class="order-success__buttons">
        <ButtonApp :label="'Повернутись до меню'" />
      </div>
    </div>
  </div>
</template>
