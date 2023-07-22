<script setup>
import { ref, onMounted, computed } from 'vue'
import FooterApp from '@/components/layouts/FooterApp.vue'
import CurrentLocationIcon from '@/assets/img/icons/current-location.svg'
import LocationIcon from '@/assets/img/icons/location3.svg'
import ModalApp from '@/components/shared/modals/ModalApp.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { useRoute } from 'vue-router'
import HeaderApp from '@/components/layouts/Header/HeaderApp.vue'
import InputSearch from '@/components/shared/search/InputSearch.vue'
import { auditInstance, generateUUID } from '@/utils/helpers/uuid'

const route = useRoute()

const isHomePage = computed(() => {
  return route.name === 'home'
})

const isOpenModal = ref(false)
const isOpenModalSearch = ref(false)

const isHideFooter = computed(() => {
  return route?.path.includes('verification')
})

function openPopupLocation() {
  isOpenModal.value = true
}

function openPopupAddress() {
  if (isOpenModal.value) {
    isOpenModal.value = false
  }
  isOpenModalSearch.value = true
}

onMounted(() => {
  auditInstance()
  if (isHomePage.value) {
    setTimeout(() => {
      isOpenModal.value = true
    }, 2000)
  }
})

const searchValue = ref('')
</script>
<template>
  <HeaderApp @open-popup-location="openPopupLocation" />
  <main class="page">
    <RouterView @open-location="isOpenModal = true" />
  </main>
  <FooterApp v-if="!isHideFooter" />
  <ModalApp @close-modal="isOpenModal = false" :is-open="isOpenModal">
    <template #body-popup>
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
  <ModalApp @close-modal="isOpenModalSearch = false" :is-open="isOpenModalSearch">
    <template #body-popup>
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
