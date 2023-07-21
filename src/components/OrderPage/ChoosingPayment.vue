<script setup>
import { ref } from 'vue'
import CashIcon from '@/assets/img/icons/Cash.svg'
import CardIcon from '@/assets/img/icons/credit-card.svg'
import { computed, watch } from 'vue'

const props = defineProps({
  payments: {
    type: Array,
    required: true
  }
})
const normalizePayments = computed(() => {
  return props.payments.map((item) => ({
    ...item,
    icon: item.type === 'cash' ? CashIcon : CardIcon,
    label: item.name
  }))
})
const currentPayment = ref({})

watch(
  normalizePayments,
  (newValue) => {
    if (newValue) {
      const firstElement = normalizePayments.value[0]
      currentPayment.value = { ...firstElement, label: firstElement.name }
    }
  },
  { immediate: true }
)
const emit = defineEmits(['changePayment'])

function changePayment(newValue) {
  emit('changePayment', newValue)
}
</script>
<template>
  <div class="payment">
    <div class="payment__title">Оплата</div>
    <div class="date__items">
      <div v-for="(item, index) of normalizePayments" :key="item.id" class="date__item">
        <label class="date__label">
          <input
            type="radio"
            :checked="index === 0"
            :value="item.id"
            name="payment"
            @change="changePayment(item)"
            class="date__input"
          />
          <span class="date__left"><img :src="item.icon" /> {{ item.name }}</span>
          <span class="date__circle"> </span>
        </label>
      </div>
    </div>
  </div>
</template>
