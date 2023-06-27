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
  let result = []
  menu.value.forEach((item) => {
    const newElement = item.products.filter((item) => item.isFavorite).map((item) => item.id)
    result = [...result, ...newElement]
  })
  return result
})

watch(
  menu,
  (newValue) => {
    if (newValue?.length > 0 && favoriteProducts.value.length > 0) {
      setItem('favoriteProducts', favoriteProductsIds.value)
    }
  },
  { deep: true }
)

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
</script>
<template>
  <div class="menu">
    <div class="menu__container">
      <template v-if="isLoading">
        <SkeletonApp v-for="item of 2" :key="item" :type-skeleton="'menu'" />
      </template>
      <div v-if="menu" class="menu__blocks">
        <div v-if="favoriteProducts?.length > 0" class="menu__block">
          <div class="menu__title">
            <span>❤️</span>
            Обране
          </div>
          <div class="menu__grid-layout">
            <MenuCard
              @click="openModalCard(product)"
              v-for="product of favoriteProducts"
              :key="product.id"
              :data="product"
            />
          </div>
        </div>
        <div v-for="menuItem of menu" :key="menuItem.id" class="menu__block">
          <div class="menu__title">
            <picture v-if="menuItem.image">
              <source :srcset="menuItem.image.webp" type="image/webp" />
              <source :srcset="menuItem.image.png" type="image/png" />
              <img :src="menuItem.image?.png" alt=""
            /></picture>
            {{ menuItem.title }}
          </div>
          <div v-if="menuItem.products.length > 0" class="menu__grid-layout">
            <MenuCard
              @click="openModalCard(product)"
              v-for="product of menuItem.products"
              :key="product.id"
              :data="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalApp @close-modal="closeModalCard" :is-open="isOpenModalCard">
    <template #body-popup>
      <ModalProduct
        @toggle-favorite="toggleFavorite"
        @close-modal="closeModalCard"
        :product="selectedProduct"
      />
    </template>
  </ModalApp>
</template>
