<script setup>
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
    )
    return
  } catch (err) {
    console.log(err)
  }
}

const weatherData = await getWeatherData()
console.log(weatherData)
</script>

<template>
  <div class="flex flex-1 flex-col items-center">
    <div v-if="route.query.preview" class="p-4 w-full text-center">
      <p>You are currently previewing this city. Click the "+" to add to your cities.</p>
    </div>
  </div>
</template>
