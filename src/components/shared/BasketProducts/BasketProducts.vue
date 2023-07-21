<script setup>
import ModalProduct from '@/components/MenuPage/ModalProduct.vue'
import ModalApp from '@/components/shared/modals/ModalApp.vue'
import { ref } from 'vue'
import { getProduct } from '@/api/restaurants'
import { useRoute } from 'vue-router'
import ProductCardMobile from '@/components/shared/BasketProducts/BasketCardMobile.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import BasketCard from '@/components/shared/BasketProducts/BasketCard.vue'

const { isMobile } = useBreakpoints()

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})
const route = useRoute()
const selectedProduct = ref(null)
const selectedBasketData = ref(null)
const isOpenModal = ref(false)

function closeModal() {
  isOpenModal.value = false
}

async function openModal(product) {
  const restId = route.params.id
  const response = await getProduct({ uniq_id: product.uniq_id, rest_id: restId })
  selectedBasketData.value = product
  if (response) {
    selectedProduct.value = response
    isOpenModal.value = true
  }
}
</script>
<template>
  <div class="basket-products">
    <TransitionGroup class="header-basket__items" name="list" tag="div">
      <template v-if="!isMobile">
        <BasketCard
          @open-modal="openModal"
          @click="selectedProduct = product"
          v-for="product of props.products"
          :product="product"
          :selected-id="selectedProduct?.cart_id"
          :key="product.cart_id"
        />
      </template>
      <template v-else>
        <ProductCardMobile
          @open-modal="openModal"
          @click="selectedProduct = product"
          v-for="product of props.products"
          :product="product"
          :selected-id="selectedProduct?.cart_id"
          :key="product.cart_id"
        />
      </template>
    </TransitionGroup>
    <ModalApp :type="'product'" @close-modal="closeModal" :is-open="isOpenModal">
      <template #body-popup>
        <ModalProduct
          v-if="selectedProduct"
          @close-modal="closeModal"
          :data="selectedProduct"
          :basket-data="selectedBasketData"
        />
      </template>
    </ModalApp>
  </div>
</template>
