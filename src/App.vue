<script setup>
import { ref, onMounted, computed } from 'vue'
import FooterApp from '@/components/layouts/FooterApp.vue'
import CurrentLocationIcon from '@/assets/img/icons/current-location.svg'
import LocationIcon from '@/assets/img/icons/location04.svg'
import ModalApp from '@/components/shared/modals/ModalApp.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useRoute } from 'vue-router'

import HeaderApp from '@/components/layouts/Header/HeaderApp.vue'

const route = useRoute()

const isHomePage = computed(() => {
  return route.name === 'home'
})

const isOpenModal = ref(false)
const isOpenModalSearch = ref(false)
const openPopupAddress = () => {
  isOpenModal.value = true
}

onMounted(() => {
  if (isHomePage.value) {
    setTimeout(() => {
      isOpenModal.value = true
    }, 1000)
  }
})
</script>
<template>
  <HeaderApp @open-popup-address="openPopupAddress" />
  <main class="page">
    <RouterView />
  </main>
  <FooterApp />
  <ModalApp @close-popup="isOpenModal = false" :is-open="isOpenModal">
    <template #body>
      <div class="modal-delivery">
        <div class="modal-delivery__head">
          <div class="modal-delivery__title">Куди хочете замовити доставку?</div>
          <button @click="isOpenModal = false" class="modal-delivery__close">
            <CloseIcon />
          </button>
        </div>
        <ul class="modal-delivery__list">
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="CurrentLocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>Поточне розташування</p>
              <span>Дозволити відслідковувати місцезнаходження</span>
            </div>
          </li>
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>вул. Північна, 17</p>
            </div>
          </li>
          <li @click="isOpenModalSearch = true" class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>Обрати адресу</p>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </ModalApp>
  <ModalApp @close-popup="isOpenModalSearch = false" :is-open="isOpenModalSearch">
    <template #body>
      <div class="modal-address">
        <div class="modal-address__title">Оберіть адресу</div>
      </div>
    </template>
  </ModalApp>
</template>
