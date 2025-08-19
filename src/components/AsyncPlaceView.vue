<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

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
  <div class="flex flex-1 flex-col items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="p-4 w-full text-center">
      <p>You are currently previewing this city. Click the "+" to add to your cities.</p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center py-12">
      <h1 class="text-4xl mb-2">{{ route.params.place }}</h1>
      <p>
        {{
          new Date(weatherData.currentTime).toLocaleDateString('en-gb', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('en-gb', {
            timeStyle: 'short',
          })
        }}
      </p>
    </div>

    <div
      @click="removePlace"
      class="flex items-center gap-2 cursor-pointer p-4 hover:text-red-500 duration-300"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove Location</p>
    </div>
  </div>
</template>
