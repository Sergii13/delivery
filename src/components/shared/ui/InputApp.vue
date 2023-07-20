<script setup>
import { mask as vMask } from 'vue-the-mask'
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String
  },
  mask: { type: String, default: null },
  placeholder: {
    type: String,
    required: false,
    default: 'Placeholder'
  },
  required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const placeholder = computed(() => {
  return `${props.placeholder} ${props.required ? ' (обов’язково)' : ''}`
})
</script>
<template>
  <label class="input">
    <input
      v-if="props.mask"
      v-mask="props.mask"
      v-model="value"
      :placeholder="placeholder"
      type="text"
      class="input__item"
    />
    <input v-else v-model="value" :placeholder="placeholder" type="text" class="input__item" />
  </label>
</template>
