<script setup>
import { ref } from 'vue'
import VueSelect from 'vue-select'
import SaleIcon from '@/assets/img/icons/sale.svg'
import ArrowIcon from '@/assets/img/icons/arrow.svg'
import ArrowSelectIcon from '@/assets/img/icons/arrow-select.svg'
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
watch(
  currentPayment,
  (newValue) => {
    emit('changePayment', newValue)
  },
  { immediate: true }
)

function changePayment(value) {
  console.log(value)
}
</script>
<template>
  <div class="payment">
    <div class="payment__title">Оплата</div>
    <vue-select
      @input="changePayment"
      v-model="currentPayment"
      v-if="normalizePayments"
      :options="normalizePayments"
      class="payment__select"
    >
      <template #open-indicator="{ attributes }">
        <span v-bind="attributes"><img :src="ArrowSelectIcon" alt="" /> </span>
      </template>
      <template v-slot:option="option">
        <img :src="option.icon" alt="" /> {{ option.label }}
      </template>
      <template #selected-option="{ icon, label }">
        <div class="payment__head"><img :src="icon" alt="" /> {{ label }}</div>
      </template>
    </vue-select>
  </div>
</template>
