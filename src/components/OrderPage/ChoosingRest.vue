<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
  items: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="order-rest">
    <div class="order-rest__title">Ресторан самовивозу</div>
    <ul class="order-rest__list">
      <li v-for="item of props.items" :key="item.id" class="order-rest__item">
        <label class="order-rest__label">
          <input
            @change="emit('update:modelValue', $event.target.value)"
            name="rest"
            :value="item.id"
            type="radio"
            class="order-rest__input"
          />
          <span class="order-rest__text">{{ item.title }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
