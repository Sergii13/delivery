<script setup>
const props = defineProps({
  typeSkeleton: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div v-if="props.typeSkeleton === 'restaurant'" class="skeleton skeleton_restaurant">
    <div class="skeleton__grid">
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
    </div>
  </div>
  <div v-if="props.typeSkeleton === 'order'" class="skeleton skeleton_order">
    <div class="skeleton-order__title">
      <div class="skeleton-item"></div>
    </div>
    <div class="skeleton-order__title2">
      <div class="skeleton-item"></div>
    </div>
    <div class="skeleton-order__items">
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
    </div>
  </div>
  <div v-if="props.typeSkeleton === 'menu'" class="skeleton skeleton_menu">
    <div class="skeleton__block">
      <div class="skeleton__head">
        <div class="skeleton-item"></div>
      </div>
      <div class="skeleton__grid">
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
      </div>
    </div>
  </div>
</template>
