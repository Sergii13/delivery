<script setup>
import { computed, watch } from 'vue'
import { bodyUnLock, bodyLock } from '@/utils/helpers/bodyHidden'

const emit = defineEmits(['closeModal'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    default: ''
  }
})
const isProduct = computed(() => {
  return props.type === 'product'
})
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      bodyLock()
    } else {
      bodyUnLock()
    }
  },
  { immediate: true }
)
</script>
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-show="props.isOpen" class="modal" :class="{ modal_product: isProduct }">
        <div @click="emit('closeModal')" class="modal__overlay"></div>
        <div class="modal__wrapper">
          <div class="modal__content">
            <slot name="body-popup"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
