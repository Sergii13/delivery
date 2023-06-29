<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  divider: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__container">
      <ul class="breadcrumbs__list">
        <li v-for="(item, index) of props.items" :key="item.path" class="breadcrumbs__item">
          <RouterLink v-if="!item.isDisabled" :to="{ path: item.path }"
            >{{ item.title }}
          </RouterLink>
          <span v-else>{{ item.title }}</span>
          <span v-if="index !== props.items.length - 1" class="breadcrumbs__divider"
            ><img v-if="props.divider" :src="props.divider" alt="" />
            <template v-else>-</template>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
