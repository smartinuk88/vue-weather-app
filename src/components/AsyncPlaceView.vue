<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import WeatherList from './WeatherList.vue'

const router = useRouter()
const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )

    // Calc current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

    // Calc hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
    })

    return weatherData.data
  } catch (err) {
    console.log(err)
  }
}

const removePlace = () => {
  const places = JSON.parse(localStorage.getItem('savedPlaces'))
  const updatedPlaces = places.filter((place) => place.id !== route.query.id)
  localStorage.setItem('savedPlaces', JSON.stringify(updatedPlaces))

  router.push({
    name: 'home',
  })
}

const weatherData = await getWeatherData()
console.log(weatherData)
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="p-4 w-full text-center">
      <p>You are currently previewing this location. Click the "+" to add to your locations.</p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center py-12">
      <h1 class="text-3xl mb-2">{{ route.params.place }}</h1>
      <p class="text-7xl">{{ Math.round(weatherData.current.temp) }}&deg;</p>
      <p class="text-textSecondary">{{ weatherData.current.weather[0].main }}</p>
      <p>
        H: {{ Math.round(weatherData.daily[0].temp.max) }}&deg; | L:
        {{ Math.round(weatherData.daily[0].temp.min) }}&deg;
      </p>
      <p class="text-sm">
        {{
          new Date(weatherData.currentTime).toLocaleDateString('en-gb', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
          })
        }}
      </p>
    </div>

    <!-- Weather Hourly & Weekly -->

    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-2 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col px-2 py-4 items-center justify-between border border-weatherCard-border rounded-t-full h-[146px] rounded-b-full bg-weatherCard shadow-xl"
          >
            <p class="whitespace-nowrap text-md">
              {{ new Date(hourData.currentTime).toLocaleTimeString('en-us', { hour: 'numeric' }) }}
            </p>
            <img
              class="w-[32px] h-auto"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt="weather icon"
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!route.query.preview"
      @click="removePlace"
      class="flex items-center gap-2 cursor-pointer p-4 hover:text-red-500 duration-300"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove Location</p>
    </div>
  </div>
</template>
