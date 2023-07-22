<script setup>
import { mask as vMask } from 'vue-the-mask'
import { computed, ref } from 'vue'

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
  type: { type: String, default: 'text' },
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

const refInput = ref(null)
defineExpose({
  refInput
})
</script>
<template>
  <label class="input">
    <input
      ref="refInput"
      :type="props.type"
      v-if="props.mask"
      v-mask="props.mask"
      @blur="onBlur($event.target)"
      v-model="value"
      :placeholder="placeholder"
      class="input__item"
    />
    <input
      v-else
      v-model="value"
      :type="props.type"
      @blur="onBlur($event.target)"
      :placeholder="placeholder"
      :data-id="props.id"
      class="input__item"
    />
    <span v-if="props.error" class="input__error"> {{ props.error.text }} </span>
  </label>
</template>
