<script setup>
import { useFetch } from '@/composables/useFetch'
import { getWorkedTimes } from '@/api/restaurants'
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { INTERVAL_TIME } from '@/utils/constants'
import ClockIcon from '@/assets/img/icons/clock.svg'
import TimeIcon from '@/assets/img/icons/time2.svg'
import ArrowTime from '@/components/icons/ArrowTime.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import SmallLoader from '@/components/shared/SmallLoader.vue'
import ModalApp from '@/components/shared/modals/ModalApp.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { DateTime } from 'luxon'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:date', 'update:time', 'update:type'])
const route = useRoute()
const dateValue = ref(props.date)
const refFlatpickr = ref(null)
watch(
  refFlatpickr,
  (newValue) => {
    if (newValue) {
      newValue.fp.input.value =
        DateTime.now().toISODate() === dateValue.value ? 'Сьогодні' : dateValue.value
    }
  },
  { immediate: true }
)
const flatpickrConfig = ref({
  minDate: 'today',
  disableMobile: 'true'
})
const params = computed(() => {
  return {
    rest_id: route.params.id,
    payload: {
      order_interval: INTERVAL_TIME,
      date: dateValue.value
    }
  }
})

const {
  data: workedTimes,
  isLoading: isLoadingTime,
  fetch
} = useFetch(getWorkedTimes, params.value)

function changeDate(selectedDates, dateStr, instance) {
  instance.input.value =
    DateTime.now().toISODate() === dateValue.value ? 'Сьогодні' : dateValue.value
  emit('update:date', dateValue.value)
}

function setTime(newTime) {
  emit('update:time', newTime)
  closeModal()
}

watch(
  () => props.date,
  () => {
    fetch(params.value).then(() => {
      emit('update:time', workedTimes.value?.dt_intervals?.times[0]?.format)
    })
  },
  { immediate: true }
)

const isModalOPen = ref(false)

function openModal() {
  isModalOPen.value = true
}

function closeModal() {
  isModalOPen.value = false
}
</script>
<template>
  <div class="date">
    <div class="date__title">Обрати час</div>
    <div class="date__items">
      <div class="date__item">
        <label class="date__label">
          <input
            type="radio"
            :value="'near'"
            checked
            name="date"
            @change="emit('update:type', $event.target.value)"
            class="date__input"
          />
          <span class="date__left"><img :src="ClockIcon" /> Якомога швидше (25-35 хв)</span>
          <span class="date__circle"> </span>
        </label>
      </div>
      <div class="date__item">
        <label class="date__label">
          <input
            type="radio"
            :value="'user'"
            name="date"
            @change="emit('update:type', $event.target.value)"
            class="date__input"
          />
          <span class="date__left"><img :src="TimeIcon" /> Обрати час</span>
          <span class="date__circle"> </span>
        </label>
      </div>
      <div class="date__item" :class="{ date__item_disabled: props.type !== 'user' }">
        <div v-if="props.type === 'user'" class="date__row">
          <button class="date__time">
            <flat-pickr
              ref="refFlatpickr"
              @on-change="changeDate"
              :config="flatpickrConfig"
              v-model="dateValue"
            />
            <ArrowTime class="date__arrow" />
          </button>

          <button @click="openModal" :disabled="isLoadingTime" class="date__time">
            <SmallLoader v-if="isLoadingTime" :width="20" :height="20" />
            <span v-else>{{ props.time }}</span>
            <ArrowTime class="date__arrow" />
          </button>
        </div>
      </div>
    </div>
    <ModalApp @close-modal="closeModal" :is-open="isModalOPen">
      <template #body-popup>
        <div class="modal-order">
          <div class="modal-order__head">
            <div class="modal-order__title">Оберіть час</div>
            <button @click="closeModal" class="modal-order__close">
              <CloseIcon />
            </button>
          </div>

          <ul v-if="workedTimes" class="modal-order__time-list">
            <li
              v-for="itemTime of workedTimes.dt_intervals.times"
              :key="itemTime.format"
              @click="setTime(itemTime.format)"
              class="modal-order__time-item"
              :class="{ 'modal-order__time-item_current': time === itemTime.format }"
            >
              {{ itemTime.format }}
            </li>
          </ul>
        </div>
      </template>
    </ModalApp>
  </div>
</template>
<style>
@import 'vue-select/dist/vue-select.css';
</style>
