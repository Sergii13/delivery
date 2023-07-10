<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import TagList from '@/components/MenuPage/TagList.vue'
import { tags } from '@/utils/data'
import CorrectBigIcon from '@/components/icons/CorrectBigIcon.vue'
import CounterApp from '@/components/shared/ui/CounterApp.vue'
import { computed } from 'vue'
import { useBasketStore } from '@/stores/basket'

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
const basketStore = useBasketStore()

const labelButton = computed(() => {
  const labelProduct = props.totalCount > 1 ? 'товари' : 'товар'
  return `Замовити ${props.totalCount} ${labelProduct} ${props.totalPrice} грн`
})

function updateCount(newValue, $event) {
  console.log(newValue, $event)
  if (newValue === 0) {
    basketStore.removeProduct(product)
  }
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
      <ul class="header-basket__items">
        <li
          v-for="product of props.products"
          :key="product.id"
          class="header-basket__item basket-item"
        >
          <div class="basket-item__top">
            <div class="basket-item__content">
              <div class="basket-item__title">{{ product.title }}</div>
              <div class="basket-item__descr">
                <p>{{ product.description }}</p>
              </div>
            </div>
            <div class="basket-item__image-ibg">
              <picture v-if="product.image_png">
                <source :srcset="product.image_webp" type="image/webp" />
                <source :srcset="product.image_png" type="image/png" />
                <img :src="product.image_png" alt=""
              /></picture>
            </div>
          </div>
          <TagList :tags="tags" />
          <button class="basket-item__correct">
            Редагувати
            <CorrectBigIcon />
          </button>
          <div class="basket-item__bottom">
            <div class="basket-item__price">{{ product.price }} грн</div>
            <CounterApp
              @update-count="updateCount(product)"
              :min-value="0"
              :count-value="product.qauntity"
            />
          </div>
        </li>
      </ul>
      <div class="header-basket__bottom">
        <ButtonApp :label="labelButton" />
      </div>
    </div>
  </div>
</template>
