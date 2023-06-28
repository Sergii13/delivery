<script setup>
import SeoBlock from '@/components/HomePage/SeoBlock.vue'
import BannerBlock from '@/components/HomePage/BannerBlock.vue'
import FullMenu from '@/components/MenuPage/FullMenu.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
</script>

<template>
  <BannerBlock v-if="!isMobile" />
  <FullMenu />
  <SeoBlock />
</template>
