<script setup>
defineProps({
  route: Object,
  weatherData: Object,
})
</script>

<template>
  <div
    class="flex flex-col items-center gap-2 bg-weatherCard border border-weatherCard-border p-8 mb-20 w-full rounded-lg"
  >
    <h1 class="text-3xl mb-2 font-bold">{{ route.params.place }}</h1>
    <p class="text-7xl">{{ Math.round(weatherData.current.temp) }}&deg;</p>
    <p class="text-textSecondary">{{ weatherData.current.weather[0].main }}</p>
    <div class="flex justify-center gap-2">
      <span> H: {{ Math.round(weatherData.daily[0].temp.max) }}&deg;</span> <span>|</span>
      <span>L: {{ Math.round(weatherData.daily[0].temp.min) }}&deg;</span>
    </div>

    <div class="flex justify-center gap-2">
      <p class="text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleDateString('en-gb', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          })
        }}
      </p>
      <p class="text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
          })
        }}
      </p>
    </div>
  </div>
</template>
