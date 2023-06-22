<script setup>
import BannerBlock from '@/components/HomePage/BannerBlock.vue'
import RestorauntsBlock from '@/components/HomePage/RestaurantsBlock.vue'
import SeoBlock from '@/components/HomePage/SeoBlock.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()

const emit = defineEmits(['openLocation'])
</script>

<template>
  <BannerBlock v-if="!isMobile" />
  <RestorauntsBlock @open-location="emit('openLocation')" />
  <SeoBlock />
</template>
