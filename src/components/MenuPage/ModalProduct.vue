<script setup>
import { computed, ref } from 'vue'
import CounterApp from '@/components/shared/ui/CounterApp.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'
import LikeFullIcon from '@/components/icons/LikeFullIcon.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['closeModal', 'toggleFavorite'])

const countProduct = ref(1)

const totalPrice = computed(() => {
  return countProduct.value * props.product.price
})

const buttonLabel = computed(() => {
  return `У кошик ${countProduct.value} за ${totalPrice.value} ₴ `
})
const hasModifiers = computed(() => {
  return props.product.modifiers?.length > 0
})

function updateCount(newValue) {
  countProduct.value = newValue
}
</script>
<template>
  <div v-if="props.product" class="modal-card">
    <button class="modal-card__close modal-card__button">
      <CloseIcon @click="emit('closeModal')" />
    </button>
    <div class="modal-card__top">
      <button
        @click="emit('toggleFavorite', props.product.id)"
        class="modal-card__like modal-card__button"
      >
        <LikeIcon v-if="!props.product.isFavorite" />
        <LikeFullIcon v-else />
      </button>
      <div class="modal-card__image-ibg">
        <picture>
          <source :srcset="props.product.image_webp" type="image/webp" />
          <source :srcset="props.product.image_png" type="image/png" />
          <img :src="props.product.image_png" alt=""
        /></picture>
      </div>
    </div>
    <div class="modal-card__content">
      <div class="modal-card__info">
        <div class="modal-card__title">{{ props.product.title }}</div>
        <div class="modal-card__prices">
          <span class="modal-card__new-price">{{ props.product.price }} грн</span>
          <!--          <s class="modal-card__old-price"> 195 грн </s>-->
        </div>
        <div class="modal-card__description">
          {{ props.product.description }}
        </div>
        <div class="modal-card__tags">
          <div class="modal-card__tag"><span>❤️</span>15</div>
          <div class="modal-card__tag"><span>⚡️️</span>220 kcal</div>
          <div class="modal-card__tag"><span>⚖️️</span>250 г</div>
          <div class="modal-card__tag"><span>🌶️</span>гостре</div>
          <div class="modal-card__tag"><span>🥦️</span>веган</div>
        </div>
        <template v-if="hasModifiers">
          <div class="modal-card__head head-modal">
            <div class="head-modal__title">{{ props.product.modifiers[0]?.name }}</div>
            <div class="head-modal__row">
              <span class="head-modal__descr"
                >Виберіть {{ props.product.modifiers[0]?.min }}
                <span v-if="props.product.modifiers[0]?.min === 1">опцію</span>
                <span v-else>опції</span></span
              >
              <div v-if="props.product.modifiers[0]?.min !== 0" class="head-modal__label">
                Обов’язково
              </div>
            </div>
          </div>
          <ul class="card-options">
            <li
              v-for="itemOption of props.product.modifiers[0].children"
              :key="itemOption.uniq_id"
              class="card-options__item"
            >
              <div class="card-options__info">
                {{ itemOption.name }} <span>+{{ itemOption.price }} ₴</span>
              </div>
            </li>
          </ul>
        </template>
      </div>
      <div class="modal-card__bottom">
        <CounterApp @update-count="updateCount" :count-value="countProduct" />
        <ButtonApp :label="buttonLabel" />
      </div>
    </div>
  </div>
</template>
