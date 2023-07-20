<script setup>
import { ref, watch } from 'vue'
import MinusMobIcon from '@/assets/img/icons/minus.svg'
import PlusMobIcon from '@/assets/img/icons/plus.svg'
import MinusIcon from '@/components/icons/MinusIcon.vue'
import PlusIconCounter from '@/components/icons/PlusIconCounter.vue'
import SmallLoader from '@/components/shared/SmallLoader.vue'

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
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
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

watch(
  () => props.countValue,
  (newValue) => {
    count.value = newValue
  },
  { immediate: true }
)
watch(count, () => {
  emit('updateCount', count.value)
})
</script>

<template>
  <div
    class="counter"
    :class="{ counter_loading: props.isLoading, counter_mobile: props.isMobile }"
  >
    <div class="counter__wrap">
      <button :disabled="props.minValue === count" @click="valueDecrement" class="counter__button">
        <img v-if="props.isMobile" :src="MinusMobIcon" alt="" />
        <MinusIcon v-else />
      </button>
      <div class="counter__center">
        <SmallLoader v-show="props.isLoading" :height="24" :width="24" />
        <input
          v-show="!props.isLoading"
          readonly
          :min="props.minValue"
          :max="props.maxValue"
          v-model="count"
          type="number"
          class="counter__input"
        />
      </div>

      <button :disabled="props.maxValue === count" @click="valueIncrement" class="counter__button">
        <img v-if="props.isMobile" :src="PlusMobIcon" alt="" />
        <PlusIconCounter v-else />
      </button>
    </div>
  </div>
</template>
