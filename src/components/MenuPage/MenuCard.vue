<script setup>
import PlusIcon from '@/components/icons/PlusIcon.vue'
import TagList from '@/components/MenuPage/TagList.vue'
import { tags } from '@/utils/data'
import { useBreakpoints } from '@/composables/useBreakpoints'
import LikeFullIcon from '@/components/icons/LikeFullIcon.vue'
import LikeIcon from '@/components/icons/LikeIcon.vue'

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
const emit = defineEmits(['toggleFavorite'])
const { isMobile } = useBreakpoints()
</script>
<template>
  <div v-if="props.data" class="menu-card">
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
          <button v-if="!props.isCatalog" class="menu-card__btn">
            <PlusIcon />
          </button>
          <button v-else @click.stop="emit('toggleFavorite', props.data.id)" class="menu-card__btn">
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
            <button v-if="!isCatalog" class="menu-card__btn">
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
</template>
