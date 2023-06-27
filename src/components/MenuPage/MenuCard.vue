<script setup>
import PlusIcon from '@/components/icons/PlusIcon.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div v-if="props.data" class="menu-card">
    <div class="menu-card__top">
      <div class="menu-card__image-ibg">
        <picture>
          <source :srcset="props.data.image_webp" type="image/webp" />
          <source :srcset="props.data.image_png" type="image/png" />
          <img :src="props.data.image_png" alt=""
        /></picture>
      </div>
    </div>
    <div class="menu-card__content">
      <div class="menu-card__title">{{ props.data.title }}</div>
      <div class="menu-card__row">
        <div class="menu-card__prices">
          <span class="menu-card__new-price"> {{ props.data.price }} грн </span>
          <!--          <s class="menu-card__old-price">{{ props.data.price }} грн</s>-->
        </div>
        <button class="menu-card__btn">
          <PlusIcon />
        </button>
      </div>
    </div>
  </div>
</template>
