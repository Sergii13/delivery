<script setup>
import { watch } from 'vue'

const emit = defineEmits(['closePopup'])

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.classList.add('lock')
    } else {
      document.body.classList.remove('lock')
    }
  },
  { immediate: true }
)
</script>
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props.isOpen" class="modal">
        <div @click="emit('closePopup')" class="modal__overlay"></div>
        <div class="modal__wrapper">
          <div class="modal__content">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
