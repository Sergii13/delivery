<script setup>
import { computed, ref } from 'vue'

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
  },
  verify: {
    type: Boolean,
    default: true
  }
})
const classesBtn = computed(() => ({
  'button-app_bold': props.bold,
  'button-app_border': props.type === 'border',
  'button-app_border-white': props.type === 'border-white',
  'button-app_not-verify': !props.verify
}))
const btnRef = ref(null)
defineExpose({
  btnRef
})
</script>
<template>
  <button ref="btnRef" class="button-app" :class="classesBtn">
    <img v-if="props.icon" :src="props.icon" />{{ props.label }}
  </button>
</template>
