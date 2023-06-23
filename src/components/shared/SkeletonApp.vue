<script setup>
const props = defineProps({
  typeSkeleton: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="skeleton skeleton_restaurant">
    <div v-if="props.typeSkeleton === 'restaurant'" class="skeleton__grid">
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
      <div class="skeleton-item"></div>
    </div>
  </div>
</template>
