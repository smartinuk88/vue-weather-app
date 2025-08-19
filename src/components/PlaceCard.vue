<script setup>
defineProps({
  place: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center justify-between pt-10 pb-4 px-6 rounded-4xl cursor-pointer bg-gradient-to-r from-cardPrimary to-cardSecondary [clip-path:polygon(0_0,100%_50%,100%_100%,0%_100%)]"
    >
      <div class="flex flex-col flex-1">
        <p class="text-6xl text-textPrimary">{{ Math.round(place.weather.main.temp) }}&deg;</p>
        <p class="text-sm text-textTertiary">
          H: {{ Math.round(place.weather.main.temp_max) }}&deg; L:
          {{ Math.round(place.weather.main.temp_min) }}&deg;
        </p>
        <h2 class="text-textPrimary">{{ place.place }}, {{ place.country }}</h2>
      </div>
      <div class="self-end">
        <p class="text-sm text-textPrimary">{{ place.weather.weather[0].description }}</p>
      </div>
    </div>

    <img
      class="absolute -top-4 right-0 w-[160px] h-auto"
      :src="`https://openweathermap.org/img/wn/${place.weather.weather[0].icon}@2x.png`"
      alt="weather icon"
    />
  </div>
</template>
