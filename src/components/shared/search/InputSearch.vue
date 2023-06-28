<script setup>
import SearchIcon from '@/assets/img/icons/search.svg'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Placeholder'
  }
})
defineEmits(['update:modelValue'])
</script>
<template>
  <label class="input-search">
    <span class="input-search__icon">
      <img :src="SearchIcon" alt="" />
    </span>
    <input
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="input-search__input"
    />
  </label>
</template>
