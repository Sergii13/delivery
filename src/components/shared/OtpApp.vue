<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true
  }
})

const digits = reactive([])

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i)
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null
  }
}

const otpCont = ref(null)

const emit = defineEmits(['update:otp', 'onComplete'])

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false
    }
  }

  return true
}

const handleKeyDown = function (event, index) {
  if (event.key !== 'Tab' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
    event.preventDefault()
  }

  if (event.key === 'Backspace') {
    digits[index] = null
    emit('update:otp', digits.join(''))
    if (index != 0) {
      otpCont.value.children[index - 1].focus()
    }

    return
  }

  if (new RegExp('^([0-9])$').test(event.key)) {
    digits[index] = event.key

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus()
    }
    if (index === props.digitCount - 1) {
      emit('on-complete')
    }
    emit('update:otp', digits.join(''))
  }
}

const inputsRefs = ref([])
onMounted(() => {
  inputsRefs.value[0].focus()
})
</script>
<template>
  <div ref="otpCont" class="otp">
    <input
      ref="inputsRefs"
      type="tel"
      class="otp-input"
      :id="'id' + index"
      v-for="(item, index) in digits"
      :key="item + index"
      v-model="digits[index]"
      :placeholder="0"
      maxlength="1"
      @keydown="handleKeyDown($event, index)"
    />
  </div>
</template>
