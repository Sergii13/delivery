<script setup>
import BannerBlock from '@/components/HomePage/BannerBlock.vue'
import RestarauntsBlock from '@/components/HomePage/RestaurantsBlock.vue'
import SeoBlock from '@/components/HomePage/SeoBlock.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()

const emit = defineEmits(['openLocation'])
</script>

<template>
  <BannerBlock v-if="!isMobile" />
  <RestarauntsBlock @open-location="emit('openLocation')" />
  <SeoBlock />
</template>
