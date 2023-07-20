<script setup>
import SeoBlock from '@/components/HomePage/SeoBlock.vue'
import BannerBlock from '@/components/HomePage/BannerBlock.vue'
import FullMenu from '@/components/MenuPage/FullMenu.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import BreadcrumbsApp from '@/components/shared/BreadcrumbsApp.vue'
import DividerIcon from '@/assets/img/icons/divider.svg'

const { isMobile } = useBreakpoints()
const breadcrumbsItems = [
  { title: 'Mafia', path: '/', isDisabled: false },
  {
    title: 'Mafia (Вадима Гетьмана, 6)',
    path: '',
    isDisabled: true
  }
]
</script>

<template>
  <router-view></router-view>
  <template v-if="!isMobile">
    <BreadcrumbsApp :items="breadcrumbsItems" :divider="DividerIcon" />
    <BannerBlock />
  </template>
  <FullMenu />
  <SeoBlock />
</template>
