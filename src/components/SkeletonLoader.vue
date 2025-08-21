<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'rectangle', // 'rectangle' o 'circle'
  },
  bgClass: {
    type: String,
    default: 'bg-gray-300', // color base del loader
  },
  cssClass: {
    type: String,
    default: '', // clases adicionales de tamaño, padding, etc.
  },
  shimmerColor: {
    type: String,
    default: '#ffffff', // color del shimmer
  },
})

const loaderClass = computed(() => {
  if (props.cssClass) return props.cssClass
  return props.type === 'circle' ? 'rounded-full' : 'rounded'
})

const shimmerStyle = computed(() => ({
  backgroundImage: `linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(${props.shimmerColor
      .slice(1)
      .match(/.{2}/g)
      ?.map((h) => parseInt(h, 16))
      .join(', ')}, 0.2) 20%,
    rgba(${props.shimmerColor
      .slice(1)
      .match(/.{2}/g)
      ?.map((h) => parseInt(h, 16))
      .join(', ')}, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  )`,
}))
</script>

<template>
  <div :class="['relative overflow-hidden', bgClass, loaderClass]">
    <div class="shimmer absolute inset-0" :style="shimmerStyle"></div>
    <slot></slot>
  </div>
</template>

<style scoped>
.shimmer {
  transform: translateX(-100%);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
