<script setup>
import { computed, ref } from 'vue'
import CartIcon from '@/assets/img/icons/cart.svg'
import MenuIcon from '@/assets/img/icons/menu.svg'
import AsideMenu from '@/components/layouts/Header/AsideMenu.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SearchIcon from '@/assets/img/icons/search.svg'
import { useRoute, useRouter } from 'vue-router'
import SearchForm from '@/components/layouts/Header/SearchForm.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { bodyLock, bodyUnLock } from '@/utils/helpers/bodyHidden'

const emit = defineEmits(['openPopupLocation'])
const isOpenMenu = ref(false)
const toggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value
  if (isOpenMenu.value) {
    bodyLock()
  } else {
    bodyUnLock()
  }
}

const isOpenListLanguage = ref(false)
const currentLanguage = ref({ longName: 'Ukrainian', shortName: 'UA' })
const languages = ref([
  { longName: 'Ukrainian', shortName: 'UA' },
  {
    longName: 'English',
    shortName: 'EN'
  },
  { longName: 'Polska', shortName: 'PL' },
  { longName: 'Deutsche', shortName: 'DE' }
])

const isOpenSearch = ref(false)

const handleClickOutsideSearch = () => {
  isOpenSearch.value = false
}
const setLanguage = (item) => {
  currentLanguage.value = item
  isOpenListLanguage.value = false
}
const handleClickOutsideLanguage = () => {
  isOpenListLanguage.value = false
}

const route = useRoute()
const router = useRouter()
const isSmallHeader = computed(() => {
  if (route.name === 'policy') {
    return true
  }
  return false
})
const titleHeader = computed(() => {
  return route.meta.title
})
const isPolicyPage = computed(() => {
  if (route.name === 'policy') {
    return true
  }
  return false
})

const { isMobile } = useBreakpoints()
</script>

<template>
  <header class="header" :class="{ header_small: isSmallHeader, header_policy: isPolicyPage }">
    <div class="header__container">
      <div class="header__row">
        <div v-if="isSmallHeader" class="header__title">
          {{ titleHeader }}
        </div>
        <div v-if="!isSmallHeader" class="header__left">
          <button @click="toggleMenu" class="header__menu-icon">
            <img :src="MenuIcon" alt="" />
          </button>
        </div>
        <div class="header__right">
          <div
            v-click-outside="handleClickOutsideSearch"
            v-if="!isSmallHeader && !isMobile"
            class="header__action-item"
          >
            <button @click="isOpenSearch = true" class="header__action-btn">
              <img :src="SearchIcon" alt="" />
            </button>
            <Transition name="search-form">
              <SearchForm @close-search="isOpenSearch = false" v-if="isOpenSearch" />
            </Transition>
          </div>
          <div v-click-outside="handleClickOutsideLanguage" class="header__action-item">
            <div @click="isOpenListLanguage = true" class="header__lang">
              {{ currentLanguage.shortName }}
            </div>
            <Transition name="lang">
              <div v-show="isOpenListLanguage" class="header-lang">
                <ul>
                  <li v-for="language of languages" :key="language.longName">
                    <button
                      @click="setLanguage(language)"
                      class="header-lang__link"
                      :class="{ active: language.longName === currentLanguage.longName }"
                    >
                      {{ language.longName }}
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
          <div v-if="!isSmallHeader && !isMobile" class="header__action-item">
            <button class="header__action-btn">
              <img :src="CartIcon" alt="" />
            </button>
          </div>
          <div v-if="isSmallHeader" class="header__action-item">
            <button @click="router.go(-1)" class="header__action-btn">
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
      <Transition name="menu">
        <AsideMenu
          @open-popup-location="emit('openPopupLocation')"
          @close-menu="toggleMenu"
          v-if="isOpenMenu"
        />
      </Transition>
    </div>
  </header>
</template>
