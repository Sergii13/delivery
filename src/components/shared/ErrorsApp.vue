<script setup>
const props = defineProps({
  items: { type: Array, required: true }
})
</script>
<template>
  <div class="error">
    <ul class="error__list">
      <li v-for="item of props.items" :key="item" class="error__item">{{ item }}</li>
    </ul>
  </div>
</template>
