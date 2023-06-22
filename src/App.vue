<script setup>
import { ref, onMounted, computed } from 'vue'
import FooterApp from '@/components/layouts/FooterApp.vue'
import CurrentLocationIcon from '@/assets/img/icons/current-location.svg'
import LocationIcon from '@/assets/img/icons/location04.svg'
import ModalApp from '@/components/shared/modals/ModalApp.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useRoute } from 'vue-router'

import HeaderApp from '@/components/layouts/Header/HeaderApp.vue'
import InputSearch from '@/components/shared/search/InputSearch.vue'

const route = useRoute()

const isHomePage = computed(() => {
  return route.name === 'home'
})

const isOpenModal = ref(false)
const isOpenModalSearch = ref(false)
const openPopupLocation = () => {
  isOpenModal.value = true
}
const openPopupAddress = () => {
  if (isOpenModal.value) {
    isOpenModal.value = false
  }
  isOpenModalSearch.value = true
}

onMounted(() => {
  if (isHomePage.value) {
    setTimeout(() => {
      isOpenModal.value = true
    }, 1000)
  }
})

const searchValue = ref('')
</script>
<template>
  <HeaderApp @open-popup-location="openPopupLocation" />
  <main class="page">
    <RouterView @open-location="isOpenModal = true" />
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
          <li @click="openPopupAddress" class="modal-delivery__item">
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
        <button @click="isOpenModalSearch = false" class="modal-address__close">
          <CloseIcon />
        </button>
        <div class="modal-address__title">Оберіть адресу</div>
        <form action="#" class="modal-address__form">
          <InputSearch v-model="searchValue" :placeholder="'Ваша адреса'" />
        </form>
        <ul
          v-if="searchValue.length === 0"
          class="modal-delivery__list modal-delivery__list_search"
        >
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
        </ul>
        <ul v-if="searchValue.length > 0" class="modal-delivery__list modal-delivery__list_search">
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>вул. Симона Петлюри</p>
            </div>
          </li>
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>вул. Солом’янська</p>
            </div>
          </li>
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>вул. Симона Петлюри</p>
            </div>
          </li>
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>вул. Святошинська</p>
            </div>
          </li>
          <li class="modal-delivery__item">
            <div class="modal-delivery__icon"><img :src="LocationIcon" /></div>
            <div class="modal-delivery__content">
              <p>вул. Сіверська</p>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </ModalApp>
</template>
