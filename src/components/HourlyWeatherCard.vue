<script setup>
defineProps({
  data: Object,
})
</script>

<template>
  <div
    class="flex flex-col px-2 py-4 items-center justify-between bg-bg-hourly-daily border border-border-hourly-daily rounded-t-full h-[146px] rounded-b-full shadow-xl"
  >
    <p class="whitespace-nowrap text-md">
      {{ new Date(data.dt * 1000).toLocaleTimeString('en-gb', { hour: 'numeric' }) }}
    </p>
    <img
      class="w-[32px] h-auto"
      :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
    />
    <p class="text-xl">{{ Math.round(data.temp) }}°</p>
  </div>
</template>
