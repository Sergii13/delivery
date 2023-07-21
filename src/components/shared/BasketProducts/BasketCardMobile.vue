<script setup>
import { computed } from 'vue'
import CorrectBigIcon from '@/components/icons/CorrectBigIcon.vue'
import CounterApp from '@/components/shared/ui/CounterApp.vue'
import { useBasketStore } from '@/stores/basket'
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
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
const modifiersString = computed(() => {
  return props.product.options.map((item) => item.name).join(', ')
})
const basketStore = useBasketStore()

async function updateCount(newValue, product) {
  await basketStore.updateProduct(product.cart_id, newValue)
}
</script>
<template>
  <div class="card-mobile">
    <CounterApp
      @update-count="(newCount) => updateCount(newCount, product)"
      :min-value="0"
      :is-mobile="isMobile"
      :is-loading="basketStore.isLoadingUpdate && props.selectedId === product.cart_id"
      :count-value="product.qty"
    />
    <div class="card-mobile__row">
      <div class="card-mobile__content">
        <div class="card-mobile__head">
          <div class="card-mobile__image-ibg">
            <picture v-if="props.product.prod.image_png">
              <source :srcset="props.product.prod.image_webp" type="image/webp" />
              <source :srcset="props.product.prod.image_png" type="image/png" />
              <img :src="props.product.prod.image_png" alt=""
            /></picture>
          </div>
          <div class="card-mobile__head-main">
            <div class="card-mobile__title">
              <span>{{ props.product.qty }} х {{ props.product.name }}</span
              ><span>{{ props.product.subTotal }}₴</span>
            </div>
            <button @click="emit('openModal', props.product)" class="card-mobile__correct">
              <CorrectBigIcon />
            </button>
          </div>
        </div>
        <div class="card-mobile__description">{{ modifiersString }}</div>
      </div>
    </div>
  </div>
</template>
