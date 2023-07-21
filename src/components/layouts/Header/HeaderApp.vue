<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import CartIcon from '@/assets/img/icons/cart.svg'
import MenuIcon from '@/assets/img/icons/menu.svg'
import MenuRestIcon from '@/assets/img/icons/menu2.svg'
import AsideMenu from '@/components/layouts/Header/AsideMenu.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SearchIcon from '@/assets/img/icons/search.svg'
import { useRoute, useRouter } from 'vue-router'
import SearchForm from '@/components/layouts/Header/SearchForm.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { bodyLock, bodyUnLock } from '@/utils/helpers/bodyHidden'
import LogoImg from '@/assets/img/Logo.png'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import HeaderBasket from '@/components/layouts/Header/HeaderBasket.vue'

const emit = defineEmits(['openPopupLocation'])
const isOpenMenu = ref(false)
const { isMobile } = useBreakpoints()

function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value
  if (isOpenMenu.value) {
    bodyLock()
  } else {
    bodyUnLock()
  }
}

const isOpenListLanguage = ref(false)
const currentLanguage = ref({ longName: 'Ukrainian', shortName: 'UA' })
const languages = ref([
  { longName: 'Ukrainian', shortName: 'UA' },
  {
    longName: 'English',
    shortName: 'EN'
  },
  { longName: 'Polska', shortName: 'PL' },
  { longName: 'Deutsche', shortName: 'DE' }
])

const isOpenSearch = ref(false)

function handleClickOutsideSearch() {
  isOpenSearch.value = false
}

function setLanguage(item) {
  currentLanguage.value = item
  isOpenListLanguage.value = false
}

function handleClickOutsideLanguage() {
  isOpenListLanguage.value = false
}

const route = useRoute()
const router = useRouter()
const isSmallHeader = computed(() => {
  if (route.name === 'policy') {
    return true
  } else if (route.path.includes('verification')) {
    return true
  } else if (route.path.includes('order')) {
    return true
  }
  return false
})
const titleHeader = computed(() => {
  return route.meta.title
})
const isPolicyPage = computed(() => {
  if (route.name === 'policy') {
    return true
  }
  return false
})
const isOrderPage = computed(() => {
  if (route.name === 'order') {
    return true
  }
  return false
})
const isRestPage = computed(() => {
  if (route.name === 'restaurant') {
    return true
  }
  return false
})

function routerBack() {
  if (route.path.includes('restaurant')) {
    router.push({ name: 'restaurant' })
  } else {
    router.push({ name: 'home' })
  }
}

const headerClasses = computed(() => ({
  header_small: isSmallHeader.value,
  header_policy: isPolicyPage.value,
  header_rest: isRestPage.value
}))

const basketStore = useBasketStore()
const { productItems, isBasketEmpty, totalPrice, totalCount } = storeToRefs(basketStore)

const labelButtonBasket = computed(() => {
  return `Замовити ${totalCount.value} товар ${totalPrice.value} ₴`
})

const isOpenBasket = ref(false)

function openBasket() {
  isOpenBasket.value = true
  bodyLock()
}

function closeBasket() {
  isOpenBasket.value = false
  bodyUnLock()
}

watch(isBasketEmpty, (newValue) => {
  if (newValue) {
    closeBasket()
  }
})
onMounted(() => {
  basketStore.getBasket()
})
</script>

<template>
  <header class="header" :class="headerClasses">
    <div class="header__container">
      <div class="header__row">
        <div v-if="isSmallHeader" class="header__title">
          {{ titleHeader }}
        </div>
        <div v-if="!isSmallHeader" class="header__left">
          <button @click="toggleMenu" class="header__menu-icon">
            <img v-if="isRestPage && isMobile" :src="MenuRestIcon" alt="" />
            <img v-else :src="MenuIcon" alt="" />
          </button>
          <div v-if="isRestPage && !isMobile" class="header__address">
            <img :src="LogoImg" alt="" /> <span>Mafia (Вадима Гетьмана, 6) </span>
          </div>
        </div>
        <div class="header__right">
          <div
            v-click-outside="handleClickOutsideSearch"
            v-if="!isSmallHeader && !isMobile"
            class="header__action-item"
          >
            <button @click="isOpenSearch = true" class="header__action-btn">
              <img :src="SearchIcon" alt="" />
            </button>
            <Transition name="search-form">
              <SearchForm @close-search="isOpenSearch = false" v-if="isOpenSearch" />
            </Transition>
          </div>
          <div
            v-if="!(isMobile && isSmallHeader)"
            v-click-outside="handleClickOutsideLanguage"
            class="header__action-item"
          >
            <div @click="isOpenListLanguage = true" class="header__lang">
              {{ currentLanguage.shortName }}
            </div>
            <Transition name="lang">
              <div v-show="isOpenListLanguage" class="header-lang">
                <ul>
                  <li v-for="language of languages" :key="language.longName">
                    <button
                      @click="setLanguage(language)"
                      class="header-lang__link"
                      :class="{ active: language.longName === currentLanguage.longName }"
                    >
                      {{ language.longName }}
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
          <div v-if="!isSmallHeader && !isMobile" class="header__action-item">
            <Transition name="animate-btn">
              <ButtonApp
                v-if="!isBasketEmpty && isRestPage"
                class="header__cart-btn"
                :label="labelButtonBasket"
                :icon="CartIcon"
                @click="openBasket"
              />
            </Transition>
            <Transition name="animate-btn">
              <button
                v-if="isBasketEmpty"
                class="header__action-btn"
                :class="{ active: isBasketEmpty }"
              >
                <img :src="CartIcon" alt="" />
              </button>
            </Transition>

            <Transition name="basket">
              <HeaderBasket
                :products="productItems"
                :total-count="totalCount"
                :total-price="totalPrice"
                @close-basket="closeBasket"
                v-show="isOpenBasket"
              />
            </Transition>
          </div>
          <div v-if="isSmallHeader" class="header__action-item">
            <button @click="routerBack" class="header__action-btn">
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      <Transition name="menu">
        <AsideMenu
          @open-popup-location="emit('openPopupLocation')"
          @close-menu="toggleMenu"
          v-if="isOpenMenu"
        />
      </Transition>
    </div>
  </header>
</template>
