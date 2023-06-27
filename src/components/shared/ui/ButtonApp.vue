<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
<template>
  <button class="button-app">{{ props.label }}</button>
</template>
