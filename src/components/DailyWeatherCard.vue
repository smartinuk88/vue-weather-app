<script setup>
defineProps({
  data: Object,
})
</script>

<template>
  <div
    class="flex flex-col px-2 py-4 items-center justify-between bg-weatherCard border border-weatherCard-border rounded-t-full h-[146px] rounded-b-full shadow-xl"
  >
    <p class="whitespace-nowrap text-md">
      {{ new Date(data.dt * 1000).toLocaleDateString('en-us', { weekday: 'short' }) }}
    </p>
    <img
      class="w-[32px] h-auto"
      :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
    />
    <p class="text-xl">{{ Math.round(data.temp.day) }}°</p>
  </div>
</template>
