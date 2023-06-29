<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: ''
  },
  bold: {
    type: Boolean,
    default: false
  }
})
const classesBtn = computed(() => ({
  'button-app_bold': props.bold,
  'button-app_border': props.type === 'border'
}))
</script>
<template>
  <button class="button-app" :class="classesBtn">
    <img v-if="props.icon" :src="props.icon" />{{ props.label }}
  </button>
</template>
