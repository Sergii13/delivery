<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="switcher">
    <label class="switcher__label" v-for="item of props.items" :key="item.id">
      <input
        type="radio"
        :checked="item.type === props.modelValue"
        :value="item.type"
        class="switcher__input"
        name="switcher"
        @change="emit('update:modelValue', $event.target.value)"
      />
      <span class="switcher__text">{{ item.name }}</span></label
    >
  </div>
</template>
