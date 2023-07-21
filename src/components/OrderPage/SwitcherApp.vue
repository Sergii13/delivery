<script setup>
import { watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    required: true
  }
})
watch(
  () => props.items,
  (newValue) => {
    if (newValue) {
      emit('update:modelValue', props.items[0])
    }
  },
  { immediate: true }
)
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="switcher">
    <label class="switcher__label" v-for="item of props.items" :key="item.id">
      <input
        type="radio"
        :checked="item.id === props.modelValue.id"
        :value="item"
        class="switcher__input"
        name="switcher"
        @change="emit('update:modelValue', item)"
      />
      <span class="switcher__text">{{ item.name }}</span></label
    >
  </div>
</template>
