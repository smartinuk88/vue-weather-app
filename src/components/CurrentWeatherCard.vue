<script setup>
defineProps({
  icon: String,
  title: String,
  value: Number || String,
  unit: String,
})
</script>

<template>
  <div
    class="px-4 pt-4 pb-8 flex flex-col items-center border border-weatherCard-border w-full aspect-square bg-cardSecondary rounded-2xl shadow-xl"
  >
    <h3 class="text-sm sm:text-base text-textSecondary uppercase">
      <i :class="icon"></i> {{ title }}
    </h3>
    <p class="text-5xl sm:text-5xl md:text-6xl flex-1 flex items-end justify-center">
      {{ value }}<span class="text-lg sm:text-xl">{{ unit }}</span>
    </p>
  </div>
</template>
