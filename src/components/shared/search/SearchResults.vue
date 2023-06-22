<script setup>
import { computed } from 'vue'

const props = defineProps({
  inputValue: {
    type: String,
    required: true
  }
})
const isDefault = computed(() => {
  return props.inputValue.length === 0
})
</script>
<template>
  <div class="result-search">
    <div v-if="isDefault" class="result-search__default">
      <div class="result-search__label">Часто шукають</div>
      <ul class="result-search__list">
        <li>
          <div class="result-search__item">Mafia Позняки</div>
        </li>
        <li>
          <div class="result-search__item">Mafia Хрещатик</div>
        </li>
        <li>
          <div class="result-search__item">🍝 Паста корбонара</div>
        </li>
        <li>
          <div class="result-search__item">🌯 Шаурма</div>
        </li>
        <li>
          <div class="result-search__item">🍲 Суп</div>
        </li>
        <li>
          <div class="result-search__item">🍧 Тірамісу</div>
        </li>
      </ul>
    </div>
    <ul v-else class="result-search__list">
      <li>
        <div class="result-search__item">Мусафір</div>
      </li>
      <li>
        <div class="result-search__item">Мімоза</div>
      </li>
      <li>
        <div class="result-search__item">🥮 Мафін</div>
      </li>
      <li>
        <div class="result-search__item">🍲 Мінестроне</div>
      </li>
      <li>
        <div class="result-search__item">🥘 Мамалига</div>
      </li>
    </ul>
  </div>
</template>
