<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#49454F'
  },
  width: {
    type: Number,
    default: 24
  },
  height: {
    type: Number,
    default: 24
  }
})
const style = computed(() => {
  return `color:${props.color}; width:${props.width}px; height:${props.width}px`
})
</script>
<template>
  <div :style="style" class="small-loader">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="margin: auto; display: block; shape-rendering: auto"
      width="187px"
      height="187px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke-width="10"
        r="44"
        stroke-dasharray="207.34511513692632 71.11503837897544"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  </div>
</template>
