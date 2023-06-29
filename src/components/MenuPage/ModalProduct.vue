<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import CounterApp from '@/components/shared/ui/CounterApp.vue'
import ButtonApp from '@/components/shared/ui/ButtonApp.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'
import LikeFullIcon from '@/components/icons/LikeFullIcon.vue'
import PlusCounterIcon from '@/components/icons/PlusCounterIcon.vue'
import CheckedIcon from '@/components/icons/CheckedIcon.vue'
import MinusCounterIcon from '@/components/icons/MinusCounterIcon.vue'
import LikeBtnIcon from '@/assets/img/icons/like.svg'
import BasketBtnIcon from '@/assets/img/icons/basket.svg'
import TagList from '@/components/MenuPage/TagList.vue'
import { tags } from '@/utils/data'

const emit = defineEmits(['closeModal', 'toggleFavorite'])

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isCatalog: {
    type: Boolean,
    default: false
  }
})

const product = ref(null)

function toggleFavorite(id) {
  emit('toggleFavorite', id)
  product.value.isFavorite = !product.value.isFavorite
}

watch(
  () => props.data,
  (newValue) => {
    if (newValue) {
      let productCopy = { ...newValue }
      if (productCopy.modifiers.length > 0) {
        productCopy.modifiers.forEach((item) => {
          item.quantityOptions = 0
          item.children.forEach((item) => (item.quantity = 0))
        })
      }
      product.value = productCopy
    }
  },
  { immediate: true }
)
watch(
  product,
  () => {
    if (product.value) {
      product.value.modifiers.forEach((item) => {
        let countOptions = 0
        let totalPriceOptions = 0
        item.children.forEach((item) => {
          countOptions += item.quantity
          totalPriceOptions += item.price * item.quantity
        })
        item.quantityOptions = countOptions
        item.totalPrice = totalPriceOptions
      })
    }
  },
  { immediate: true, deep: true }
)

const countProduct = ref(1)

const totalPrice = computed(() => {
  const priceModifiers = product.value.modifiers.reduce(
    (acc, current) => acc + current.totalPrice,
    0
  )
  return countProduct.value * product.value.price + priceModifiers
})

const isValidQuantity = computed(() => {
  let isValidate = true
  product.value.modifiers.forEach((item) => {
    if (item.min !== 0 && item.min > item.quantityOptions) {
      isValidate = false
    }
  })
  return isValidate
})

const buttonLabel = computed(() => {
  return `У кошик ${countProduct.value} за ${totalPrice.value} ₴ `
})
const hasModifiers = computed(() => {
  return product.value.modifiers?.length > 0
})

function updateCount(newValue) {
  countProduct.value = newValue
}

function incrementQuantityOption(id) {
  product.value.modifiers.forEach((item) => {
    if (item.quantityOptions < item.max) {
      item.children.forEach((itemOption) => {
        if (itemOption.uniq_id === id) {
          if (itemOption.quantity < itemOption.max) {
            itemOption.quantity++
          }
        }
      })
    }
  })
}

function decrementQuantityOption(id) {
  product.value.modifiers.forEach((item) => {
    item.children.forEach((itemOption) => {
      if (itemOption.uniq_id === id) {
        if (itemOption.quantity > 0) {
          itemOption.quantity--
        }
      }
    })
  })
}

const scrollBlockRef = ref(null)
const modalTopBlockRef = ref(null)
const overlayBlockRef = ref(null)
const titleRef = ref(null)
const imageRef = ref(null)

function animateOnScroll() {
  const procent = scrollBlockRef.value.scrollTop / modalTopBlockRef.value.offsetHeight
  modalTopBlockRef.value.style.opacity = 1 - procent
  overlayBlockRef.value.style.opacity = procent * 1.4
  if (procent > 0.55) {
    titleRef.value.classList.remove('scroll')
    imageRef.value.classList.remove('scroll')
  } else {
    titleRef.value.classList.add('scroll')
    imageRef.value.classList.add('scroll')
  }
}

onMounted(() => {
  animateOnScroll()
  scrollBlockRef.value.addEventListener('scroll', animateOnScroll)
})
onBeforeUnmount(() => {
  scrollBlockRef.value.removeEventListener('scroll', animateOnScroll)
})
</script>
<template>
  <div v-if="product" class="modal-card">
    <div class="modal-card__head2">
      <div ref="overlayBlockRef" class="modal-card__head2-overlay"></div>
      <div ref="imageRef" class="modal-card__head2-img">
        <picture>
          <source :srcset="product.image_webp" type="image/webp" />
          <source :srcset="product.image_png" type="image/png" />
          <img :src="product.image_png" alt=""
        /></picture>
      </div>
      <div ref="titleRef" class="modal-card__head2-title">
        {{ product.title }}
      </div>
      <button @click="emit('closeModal')" class="modal-card__close modal-card__button">
        <CloseIcon />
      </button>
    </div>
    <div ref="scrollBlockRef" class="modal-card__scroll">
      <div ref="modalTopBlockRef" class="modal-card__top">
        <button
          v-if="!isCatalog"
          @click="toggleFavorite(product.id)"
          class="modal-card__like modal-card__button"
        >
          <LikeIcon v-if="!product.isFavorite" />
          <LikeFullIcon v-else />
        </button>
        <div class="modal-card__image-ibg">
          <picture>
            <source :srcset="product.image_webp" type="image/webp" />
            <source :srcset="product.image_png" type="image/png" />
            <img :src="product.image_png" alt=""
          /></picture>
        </div>
      </div>
      <div class="modal-card__content">
        <div class="modal-card__info">
          <div class="modal-card__title">{{ product.title }}</div>
          <div class="modal-card__prices">
            <span class="modal-card__new-price">{{ product.price }} грн</span>
            <!--          <s class="modal-card__old-price"> 195 грн </s>-->
          </div>
          <div class="modal-card__description">
            {{ product.description }}
          </div>
          <TagList :tags="tags" />
          <template v-if="hasModifiers && !isCatalog">
            <div
              v-for="modifier of product.modifiers"
              :key="modifier.uniq_id"
              class="modal-card__options-info"
            >
              <div class="modal-card__head head-modal">
                <div class="head-modal__title">{{ modifier.name }}</div>
                <div v-if="modifier.min !== 0" class="head-modal__row">
                  <span class="head-modal__descr"
                    >Виберіть {{ modifier.min }}
                    <span v-if="modifier.min === 1">опцію</span>
                    <span v-else>опції</span></span
                  >
                  <div class="head-modal__label">Обов’язково</div>
                </div>
                <div v-if="modifier.quantityOptions > 0" class="head-modal__row">
                  <div class="head-modal__descr">
                    Обрано {{ modifier.quantityOptions }} з {{ modifier.max }} опцій
                  </div>
                </div>
                <div v-if="modifier.quantityOptions === 0" class="head-modal__row">
                  <div class="head-modal__descr">Максимум {{ modifier.max }} шт.</div>
                </div>
              </div>
              <ul class="card-options">
                <li
                  v-for="itemOption of modifier.children"
                  :key="itemOption.uniq_id"
                  class="card-options__item"
                  :class="{ active: itemOption.quantity > 0 }"
                >
                  <div class="card-options__info">
                    {{ itemOption.name }}
                    <span v-if="itemOption.price > 0">+{{ itemOption.price }} ₴</span>
                  </div>

                  <div class="card-options__actions">
                    <div v-show="itemOption.max === 1" class="card-options__one-element">
                      <button
                        v-show="itemOption.quantity === 0"
                        @click="incrementQuantityOption(itemOption.uniq_id)"
                        class="card-options__btn"
                      >
                        <PlusCounterIcon />
                      </button>
                      <button
                        @click="decrementQuantityOption(itemOption.uniq_id)"
                        v-show="itemOption.quantity > 0"
                        class="card-options__btn"
                      >
                        <CheckedIcon />
                      </button>
                    </div>
                    <div v-show="itemOption.max > 1" class="card-options__counter">
                      <button
                        @click="decrementQuantityOption(itemOption.uniq_id)"
                        v-show="itemOption.quantity > 0"
                        class="card-options__btn"
                      >
                        <MinusCounterIcon />
                      </button>
                      <span v-show="itemOption.quantity > 0" class="card-options__count">{{
                        itemOption.quantity
                      }}</span>
                      <button
                        @click="incrementQuantityOption(itemOption.uniq_id)"
                        class="card-options__btn"
                      >
                        <PlusCounterIcon />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </div>
        <div class="modal-card__bottom">
          <template v-if="!isCatalog">
            <CounterApp @update-count="updateCount" :count-value="countProduct" />
            <ButtonApp :disabled="!isValidQuantity" :label="buttonLabel" />
          </template>
          <template v-else>
            <ButtonApp
              v-if="!product.isFavorite"
              :icon="LikeBtnIcon"
              class="button-app_bold"
              :label="'Додати до обраного'"
              @click="toggleFavorite(product.id)"
            />
            <ButtonApp
              v-else
              :icon="BasketBtnIcon"
              :type="'border'"
              :bold="true"
              :label="'Видалити з обраного'"
              @click="toggleFavorite(product.id)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
