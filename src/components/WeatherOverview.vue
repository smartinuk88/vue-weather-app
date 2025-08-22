<script setup>
import { toLocalTime } from '@/utils/time'

defineProps({
  route: Object,
  weatherData: Object,
})
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-3 justify-center items-center gap-4 sm:gap-12 md:gap-20 bg-weatherCard border border-weatherCard-border p-8 mb-20 min-h-72 w-full rounded-lg"
  >
    <div class="flex flex-col sm:col-span-2 items-center gap-2">
      <h1 class="text-4xl sm:text-5xl md:text-7xl mb-2 font-bold">{{ route.params.place }}</h1>
      <p class="text-7xl">{{ Math.round(weatherData.current.temp) }}&deg;</p>
    </div>
    <div class="flex flex-col items-center gap-1">
      <img
        class="w-[60px] sm:w-[140px] h-auto"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt="weather icon"
      />
      <p class="text-textSecondary">{{ weatherData.current.weather[0].main }}</p>
      <div class="flex justify-center gap-2">
        <span> H: {{ Math.round(weatherData.daily[0].temp.max) }}&deg;</span> <span>|</span>
        <span>L: {{ Math.round(weatherData.daily[0].temp.min) }}&deg;</span>
      </div>

      <div class="flex justify-center gap-2">
        <p class="text-sm">
          {{
            new Date(weatherData.current.dt * 1000).toLocaleDateString('en-gb', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              timeZone: weatherData.timezone,
            })
          }}
        </p>
        <p class="text-sm">
          {{
            toLocalTime(weatherData.current.dt, weatherData.timezone_offset).toLocaleTimeString(
              'en-gb',
              {
                timeStyle: 'short',
                timeZone: 'UTC',
              },
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>
