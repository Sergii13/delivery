<script setup>
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import ErrorImg from '@/assets/img/icons/error.svg'
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
          <img :src="ErrorImg" alt="" />
        </div>
        <div class="order-success__title red">Помилка оплати</div>
        <div class="order-success__text">
          <p>
            Нажаль під час оплати сталася помилка. <br />
            Спробуйте інший метод оплати <br />
            або зверніться до адміністратора.
          </p>
        </div>
        <div class="order-success__buttons">
          <ButtonApp :label="'Зв’язатися з адміністратором'" :type="'border-white'" />
          <ButtonApp :label="'Спробувати ще'" />
        </div>
      </div>
    </div>
  </div>
</template>
