<script setup>
import { ref } from 'vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import TagList from '@/components/MenuPage/TagList.vue'
import MinusMobIcon from '@/assets/img/icons/minus.svg'
import PlusMobIcon from '@/assets/img/icons/plus.svg'
import { tags } from '@/utils/data'
import { useBreakpoints } from '@/composables/useBreakpoints'
import LikeFullIcon from '@/components/icons/LikeFullIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import SmallLoader from '@/components/shared/SmallLoader.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isCatalog: {
    type: Boolean,
    default: false
  },
  isListType: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['toggleFavorite', 'openModal'])
const { isMobile } = useBreakpoints()

const basketStore = useBasketStore()
const { productItems, isLoadingUpdate } = storeToRefs(basketStore)

const basketProducts = computed(() => {
  return productItems.value.filter((item) => item.uniq_id === props.data.uniq_id)
})
const selectedItem = ref(null)
const clickedBtn = ref('')

const hasRequiredModifiers = computed(() => {
  let countRequired = 0
  props.data.modifiers?.forEach((itemModif) => {
    countRequired += itemModif.min
  })
  return countRequired > 0
})

function updateCount(newValue, product, btn) {
  selectedItem.value = product.cart_id
  clickedBtn.value = btn
  if (!isLoadingUpdate.value) {
    basketStore.updateProduct(product.cart_id, newValue)
  }
}

async function addToBasket(event) {
  if (hasRequiredModifiers.value) {
    emit('openModal')
  } else {
    event.stopPropagation()
    const productCopy = JSON.parse(JSON.stringify(props.data))
    productCopy.quantity = 1
    const newOptions = []
    await basketStore.addProduct(productCopy, newOptions)
  }
}
</script>
<template>
  <div v-if="props.data" class="menu-card">
    <div class="menu-card__main">
      <div class="menu-card__row-main">
        <div class="menu-card__top">
          <div class="menu-card__image-ibg">
            <picture>
              <source :srcset="props.data.image_webp" type="image/webp" />
              <source :srcset="props.data.image_png" type="image/png" />
              <img :src="props.data.image_png" alt=""
            /></picture>
          </div>
          <template v-if="isListType && isMobile">
            <button @click="addToBasket" v-if="!props.isCatalog" class="menu-card__btn">
              <PlusIcon />
            </button>
            <button
              v-else
              @click.stop="emit('toggleFavorite', props.data.id)"
              class="menu-card__btn"
            >
              <LikeIcon v-if="!props.data.isFavorite" />
              <LikeFullIcon v-else />
            </button>
          </template>
        </div>
        <div class="menu-card__content">
          <div class="menu-card__title">{{ props.data.title }}</div>
          <div class="menu-card__row">
            <div class="menu-card__prices">
              <span class="menu-card__new-price"> {{ props.data.price }} грн </span>
              <!--          <s class="menu-card__old-price">{{ props.data.price }} грн</s>-->
            </div>
            <template v-if="!isListType">
              <button @click="addToBasket" v-if="!isCatalog" class="menu-card__btn">
                <PlusIcon />
              </button>
              <button
                v-else
                @click.stop="emit('toggleFavorite', props.data.id)"
                class="menu-card__btn"
              >
                <LikeIcon v-if="!props.data.isFavorite" />
                <LikeFullIcon v-else />
              </button>
            </template>
          </div>
          <div v-if="isListType && isMobile" class="menu-card__description">
            <p>{{ props.data.description }}</p>
          </div>
        </div>
      </div>
      <TagList v-if="isListType && isMobile" :tags="tags" />
    </div>
    <div
      v-if="props.isListType && basketProducts.length > 0"
      class="menu-card__mobile menu-card-mob"
    >
      <div v-for="item of basketProducts" :key="item.uniq_id" class="menu-card-mob__item">
        <div class="menu-card-mob__row">
          <button
            @click.stop="updateCount(item.qty - 1, item, 'minus')"
            class="menu-card-mob__button"
          >
            <SmallLoader
              v-if="isLoadingUpdate && clickedBtn === 'minus' && selectedItem === item.cart_id"
              :width="16"
              :height="16"
            />
            <img v-else :src="MinusMobIcon" alt="" />
          </button>
          <div class="menu-card-mob__main">
            <div class="menu-card-mob__head">
              <span>{{ item.qty }} х {{ item.name }} </span>
              <span>{{ item.subTotal }}₴ </span>
            </div>
            <div v-if="item.options.length > 0" class="menu-card-mob__descr">
              {{ item.options.map((item) => item.name).join(', ') }}
            </div>
          </div>
          <button
            @click.stop="updateCount(item.qty + 1, item, 'plus')"
            class="menu-card-mob__button"
          >
            <SmallLoader
              v-if="isLoadingUpdate && clickedBtn === 'plus' && selectedItem === item.cart_id"
              :width="16"
              :height="16"
            />
            <img v-else :src="PlusMobIcon" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
