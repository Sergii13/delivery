<script setup>
import { ref, watch } from 'vue'
import MinusIcon from '@/components/icons/MinusIcon.vue'
import PlusIconCounter from '@/components/icons/PlusIconCounter.vue'

const props = defineProps({
  countValue: {
    type: Number,
    required: false,
    default: 1
  },
  minValue: {
    type: Number,
    required: false,
    default: 1
  },
  maxValue: {
    type: Number,
    required: false,
    default: 100
  }
})
const count = ref(props.countValue)
const emit = defineEmits(['updateCount'])

function valueDecrement() {
  if (props.minValue !== count.value) {
    count.value--
  }
}

function valueIncrement() {
  if (props.maxValue !== count.value) {
    count.value++
  }
}

watch(count, () => {
  emit('updateCount', count.value)
})
</script>

<template>
  <div class="counter">
    <button :disabled="props.minValue === count" @click="valueDecrement" class="counter__button">
      <MinusIcon />
    </button>
    <input
      readonly
      :min="props.minValue"
      :max="props.maxValue"
      v-model="count"
      type="number"
      class="counter__input"
    />
    <button :disabled="props.maxValue === count" @click="valueIncrement" class="counter__button">
      <PlusIconCounter />
    </button>
  </div>
</template>
