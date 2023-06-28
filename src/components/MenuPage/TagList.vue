<script setup>
const props = defineProps({
  tags: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="tags">
    <div v-for="tag of props.tags" :key="tag.text" class="tags__item">
      {{ tag.icon }}<span>{{ tag.text }}</span>
    </div>
  </div>
</template>
