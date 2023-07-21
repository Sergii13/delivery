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
  id: {
    type: String,
    default: ''
  },
  error: {
    type: Object,
    default: null
  },
  required: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'onBlur'])

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

function onBlur(target) {
  emit('onBlur', target)
}
</script>
<template>
  <label class="input">
    <input
      v-if="props.mask"
      v-mask="props.mask"
      @blur="onBlur($event.target)"
      v-model="value"
      :placeholder="placeholder"
      type="text"
      class="input__item"
    />
    <input
      v-else
      v-model="value"
      @blur="onBlur($event.target)"
      :placeholder="placeholder"
      :data-id="props.id"
      type="text"
      class="input__item"
    />
    <span v-if="props.error" class="input__error"> {{ props.error.text }} </span>
  </label>
</template>
