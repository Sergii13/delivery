<script setup>
import { useFetch } from '@/composables/useFetch'
import { getFullMenu } from '@/api/restaurants'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MenuCard from '@/components/MenuPage/MenuCard.vue'
import SkeletonApp from '@/components/shared/SkeletonApp.vue'
import ModalApp from '@/components/shared/modals/ModalApp.vue'
import ModalProduct from '@/components/MenuPage/ModalProduct.vue'
import { getItem, setItem } from '@/utils/helpers/persistantStorage'
import { vIntersectionObserver } from '@vueuse/components'
import { OFFSET_HEADER } from '@/utils/constants'
import WarningIcon from '@/assets/img/icons/warning.svg'
import RestImage from '@/assets/img/res-bg.png'
import LogoImg from '@/assets/img/Logo.png'
import LocationIcon from '@/assets/img/icons/location3.svg'
import TimeIcon from '@/assets/img/icons/time.svg'
import GridIcon from '@/components/icons/GridIcon.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import ArrowBreadcrumbsIcon from '@/components/icons/ArrowBreadcrumbsIcon.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

const route = useRoute()
const idRestaurant = route.params.id

const { data: menu, isLoading, fetch } = useFetch(getFullMenu, { id: idRestaurant })

onMounted(async () => {
  await fetch()
  getFavoriteFromStorage()
})

const favoriteProducts = computed(() => {
  let result = []
  menu.value.forEach((item) => {
    result = [...result, ...item.products.filter((item) => item.isFavorite)]
  })
  return result
})

const favoriteProductsIds = computed(() => {
  let result
  result = favoriteProducts.value.map((item) => item.id)
  return result
})

const navMenu = computed(() => {
  return menu.value.map((item) => ({ title: item.title, image: item.image, id: item.id }))
})

function getFavoriteFromStorage() {
  const idsFromStorage = getItem('favoriteProducts')
  if (idsFromStorage.length > 0) {
    idsFromStorage.forEach((idStorage) => {
      menu.value.forEach((item) => {
        item.products.map((itemMenu) => {
          if (itemMenu.id === idStorage) {
            itemMenu.isFavorite = true
          }
        })
      })
    })
  }
}

function toggleFavorite(itemId) {
  menu.value.forEach((item, index) => {
    let indexProduct
    indexProduct = item.products.findIndex((findElement) => {
      return findElement.id === itemId
    })
    if (indexProduct >= 0) {
      const currentProduct = menu.value[index].products[indexProduct]
      currentProduct.isFavorite = !currentProduct.isFavorite
    }
  })
}

watch(
  menu,
  (newValue) => {
    if (newValue?.length > 0 && favoriteProducts.value.length > 0) {
      setItem('favoriteProducts', favoriteProductsIds.value)
    }
  },
  { deep: true }
)

const isOpenModalCard = ref(false)
const selectedProduct = ref(null)

function openModalCard(product) {
  selectedProduct.value = product
  isOpenModalCard.value = true
}

function closeModalCard() {
  isOpenModalCard.value = false
  selectedProduct.value = null
}

const activeBlock = ref(null)
const blocksRefs = ref([])
const favoriteRef = ref(null)
const FAVORITE_ID = 'favorite_id'

watch(favoriteRef, (newValue) => {
  if (newValue) {
    blocksRefs.value.push(favoriteRef.value)
  }
})

function setActiveBlock(blockId) {
  activeBlock.value = blockId
  scrollToElement(blockId)
}

function scrollToElement(id) {
  const el = blocksRefs.value.find((item) => item.getAttribute('id') === id.toString())
  const offsetTop = el.getBoundingClientRect().top + scrollY - OFFSET_HEADER
  if (el) {
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

const navRef = ref(null)
const navItemRefs = ref([])
const favoriteNavRef = ref(null)

watch(favoriteNavRef, (newValue) => {
  if (newValue) {
    navItemRefs.value.push(favoriteNavRef.value)
  }
})

function navScrollToActive(id) {
  const activeNav = navItemRefs.value.find((item) => item.getAttribute('data-id') === id.toString())
  if (activeNav) {
    const viewportWidth = window.innerWidth
    const elementWidth = activeNav.offsetWidth
    const scrollWidth = activeNav.getBoundingClientRect().left - viewportWidth / 2 + elementWidth
    navRef.value.scrollTo({ left: scrollWidth, behavior: 'smooth' })
  }
}

function onIntersectionObserver([event]) {
  if (event.isIntersecting) {
    activeBlock.value = event.target.id
    navScrollToActive(event.target.id)
  }
}

const typeViewCards = ref('grid')
const isListType = computed(() => {
  return typeViewCards.value === 'list'
})

function setTypeViewCards(newType) {
  typeViewCards.value = newType
}

const { isMobile } = useBreakpoints()
const threshold = computed(() => {
  return isMobile.value ? 0.6 : 1
})
</script>
<template>
  <div class="menu">
    <div class="menu__main-img">
      <img :src="RestImage" alt="" />
    </div>
    <div class="menu__container">
      <template v-if="isLoading">
        <SkeletonApp v-for="item of 2" :key="item" :type-skeleton="'menu'" />
      </template>
      <div v-if="menu" class="menu__wrap">
        <div class="menu-info menu__info">
          <div class="menu-info__head">
            <img :src="LogoImg" alt="" class="menu-info__logo" />
            <div class="menu-info__title">Mafia Хрещатик</div>
          </div>
          <ul class="menu-info__list">
            <li>
              <div class="menu-info__icon">
                <img :src="LocationIcon" alt="" />
              </div>
              Київ, вул. Вадима Гетьмана, 6, ТРЦ "COSMO MULTIMALL"
            </li>
            <li>
              <div class="menu-info__icon">
                <img :src="TimeIcon" alt="" />
              </div>
              <b>11:30 - 23:00</b>
            </li>
          </ul>
          <div class="menu-info__row">
            <RouterLink :to="{ name: 'home' }" class="menu-info__link">
              <ArrowBreadcrumbsIcon />
              Ресторани Buffalino
            </RouterLink>
            <button
              @click="setTypeViewCards('list')"
              v-if="typeViewCards === 'grid'"
              class="menu-info__button-view"
            >
              <GridIcon />
            </button>
            <button
              @click="setTypeViewCards('grid')"
              v-if="typeViewCards === 'list'"
              class="menu-info__button-view"
            >
              <ListIcon />
            </button>
          </div>
        </div>
        <div ref="navRef" class="menu__nav nav-menu">
          <button
            v-if="favoriteProducts.length > 0"
            ref="favoriteNavRef"
            @click="setActiveBlock(FAVORITE_ID)"
            class="nav-menu__item"
            :data-id="FAVORITE_ID"
            :class="{ active: activeBlock === FAVORITE_ID }"
          >
            <span>❤️</span> Обране
          </button>
          <button
            v-for="menuItem of navMenu"
            ref="navItemRefs"
            :key="menuItem.id"
            @click="setActiveBlock(menuItem.id)"
            class="nav-menu__item"
            :data-id="menuItem.id"
            :class="{ active: menuItem.id.toString() === activeBlock }"
          >
            <picture v-if="menuItem.image">
              <source :srcset="menuItem.image.webp" type="image/webp" />
              <source :srcset="menuItem.image.png" type="image/png" />
              <img :src="menuItem.image?.png" alt=""
            /></picture>
            {{ menuItem.title }}
          </button>
        </div>
        <div class="menu__work-time">
          <p>
            <img :src="WarningIcon" alt="" /> Замовлення не приймаютья. Послуга стане доступною
            завтра з 11:30
          </p>
        </div>
        <div class="menu__blocks">
          <div
            v-intersection-observer="[onIntersectionObserver, { threshold: threshold }]"
            ref="favoriteRef"
            :id="FAVORITE_ID"
            v-if="favoriteProducts?.length > 0"
            class="menu__block"
          >
            <div class="menu__title">
              <span>❤️</span>
              Обране
            </div>
            <div
              class="menu__grid-layout"
              :class="{ 'menu__grid-layout_row': typeViewCards === 'list' }"
            >
              <MenuCard
                @click="openModalCard(product)"
                v-for="product of favoriteProducts"
                :key="product.id"
                :data="product"
                :is-list-type="isListType"
                :class="{ 'menu-card_list': typeViewCards === 'list' }"
              />
            </div>
          </div>
          <div
            v-intersection-observer="[onIntersectionObserver, { threshold: threshold }]"
            v-for="menuItem of menu"
            :key="menuItem.id"
            :id="menuItem.id"
            ref="blocksRefs"
            class="menu__block"
          >
            <div class="menu__title">
              <picture v-if="menuItem.image">
                <source :srcset="menuItem.image.webp" type="image/webp" />
                <source :srcset="menuItem.image.png" type="image/png" />
                <img :src="menuItem.image?.png" alt=""
              /></picture>
              {{ menuItem.title }}
            </div>
            <div
              v-if="menuItem.products.length > 0"
              class="menu__grid-layout"
              :class="{ 'menu__grid-layout_row': typeViewCards === 'list' }"
            >
              <MenuCard
                @click="openModalCard(product)"
                v-for="product of menuItem.products"
                :key="product.id"
                :data="product"
                :is-list-type="isListType"
                :class="{ 'menu-card_list': typeViewCards === 'list' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalApp @close-modal="closeModalCard" :is-open="isOpenModalCard">
    <template #body-popup>
      <ModalProduct
        v-if="selectedProduct"
        @toggle-favorite="toggleFavorite"
        @close-modal="closeModalCard"
        :data="selectedProduct"
      />
    </template>
  </ModalApp>
</template>
