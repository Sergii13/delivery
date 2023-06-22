<script setup>
import { ref } from 'vue'
import SearchResults from '@/components/shared/search/SearchResults.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SearchIcon from '@/assets/img/icons/search.svg'

const emit = defineEmits(['closeSearch'])

const searchValue = ref('')
const isOpenResults = ref(false)
const closeSearchForm = () => {
  isOpenResults.value = false
  emit('closeSearch')
}
</script>
<template>
  <div class="header-search" :class="{ open: isOpenResults }">
    <form action="#" class="header-search__head">
      <div class="header-search__icon"><img :src="SearchIcon" alt="" /></div>
      <input
        @focus="isOpenResults = true"
        v-model="searchValue"
        type="text"
        class="header-search__input"
      />
      <button @click.prevent="closeSearchForm" class="header-search__close">
        <CloseIcon />
      </button>
    </form>
    <Transition name="search">
      <SearchResults v-if="isOpenResults" :input-value="searchValue" />
    </Transition>
  </div>
</template>
