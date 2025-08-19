<script setup>
defineProps({
  place: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div class="flex items-center p-6 rounded-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-2xl">{{ place.place }}</h2>
      <h3 class="text-sm">{{ place.region }}, {{ place.country }}</h3>
    </div>
    <div class="flex items-center gap-4">
      <img
        class="w-[50px] h-auto"
        :src="`https://openweathermap.org/img/wn/${place.weather.weather[0].icon}@2x.png`"
        alt="weather icon"
      />
      <p class="text-2xl">{{ Math.round(place.weather.main.temp) }}&deg;</p>
    </div>
  </div>
</template>
