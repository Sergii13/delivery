<script setup>
import { tags } from '@/utils/data'
import CorrectBigIcon from '@/components/icons/CorrectBigIcon.vue'
import TagList from '@/components/MenuPage/TagList.vue'
import CounterApp from '@/components/shared/ui/CounterApp.vue'
import { useBasketStore } from '@/stores/basket'

const emit = defineEmits(['openModal'])
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  selectedId: {
    type: String,
    default: ''
  }
})

const basketStore = useBasketStore()

async function updateCount(newValue, product) {
  await basketStore.updateProduct(product.cart_id, newValue)
}
</script>
<template>
  <div class="header-basket__item basket-item">
    <div class="basket-item__top">
      <div class="basket-item__content">
        <div class="basket-item__title">{{ props.product.name }}</div>
        <div class="basket-item__descr">
          <p>{{ props.product.prod.description }}</p>
        </div>
      </div>
      <div class="basket-item__image-ibg">
        <picture v-if="props.product.prod.image_png">
          <source :srcset="props.product.prod.image_webp" type="image/webp" />
          <source :srcset="props.product.prod.image_png" type="image/png" />
          <img :src="props.product.prod.image_png" alt=""
        /></picture>
      </div>
    </div>
    <TagList :tags="tags" />
    <button @click="emit('openModal', product)" class="basket-item__correct">
      Редагувати
      <CorrectBigIcon />
    </button>
    <div class="basket-item__bottom">
      <div class="basket-item__price">{{ props.product.price * props.product.qty }} грн</div>
      <CounterApp
        @update-count="(newCount) => updateCount(newCount, product)"
        :min-value="0"
        :is-loading="basketStore.isLoadingUpdate && props.selectedId === product.cart_id"
        :count-value="product.qty"
      />
    </div>
  </div>
</template>
