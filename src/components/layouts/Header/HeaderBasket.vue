<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import BasketProducts from '@/components/shared/BasketProducts/BasketProducts.vue'

const emit = defineEmits(['closeBasket'])

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

const labelButton = computed(() => {
  const labelProduct = props.totalCount > 1 ? 'товари' : 'товар'
  return `Замовити ${props.totalCount} ${labelProduct} ${props.totalPrice} грн`
})

const route = useRoute()

function routeToVerify() {
  emit('closeBasket')
  router.push({ name: 'verify', params: { id: route.params.id } })
}
</script>
<template>
  <div class="header-basket">
    <div @click="emit('closeBasket')" class="header-basket__overlay"></div>
    <div class="header-basket__content">
      <div class="header-basket__head">
        <div class="header-basket__empty"></div>
        <div class="header-basket__title">Кошик</div>
        <button @click="emit('closeBasket')" class="header-basket__close">
          <CloseIcon />
        </button>
      </div>
      <BasketProducts :products="props.products" />
      <div class="header-basket__bottom">
        <ButtonApp @click="routeToVerify" :label="labelButton" />
      </div>
    </div>
  </div>
</template>
