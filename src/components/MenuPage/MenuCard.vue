<script setup>
import PlusIcon from '@/components/icons/PlusIcon.vue'
import TagList from '@/components/MenuPage/TagList.vue'
import { tags } from '@/utils/data'
import { useBreakpoints } from '@/composables/useBreakpoints'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isListType: {
    type: Boolean,
    default: false
  }
})

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
        <button v-if="isMobile && isListType" class="menu-card__btn">
          <PlusIcon />
        </button>
      </div>
      <div class="menu-card__content">
        <div class="menu-card__title">{{ props.data.title }}</div>
        <div class="menu-card__row">
          <div class="menu-card__prices">
            <span class="menu-card__new-price"> {{ props.data.price }} грн </span>
            <!--          <s class="menu-card__old-price">{{ props.data.price }} грн</s>-->
          </div>
          <button v-if="!isListType" class="menu-card__btn">
            <PlusIcon />
          </button>
        </div>
        <div v-if="isListType && isMobile" class="menu-card__description">
          <p>{{ props.data.description }}</p>
        </div>
      </div>
    </div>
    <TagList v-if="isListType && isMobile" :tags="tags" />
  </div>
</template>
