<script setup>
defineProps({
  icon: String,
  title: String,
  value: [String, Number],
  unit: String,
})
</script>

<template>
  <div
    class="px-4 pt-4 pb-8 flex flex-col items-center border border-border-hourly-daily w-full aspect-square bg-bg-current rounded-2xl shadow-xl"
  >
    <h3 class="text-xs xs:text-sm sm:text-base text-text-secondary uppercase">
      <i :class="icon"></i> {{ title }}
    </h3>
    <p class="text-4xl xs:text-5xl md:text-6xl flex-1 flex items-end justify-center">
      {{ value }}<span class="text-lg sm:text-xl">{{ unit }}</span>
    </p>
  </div>
</template>
