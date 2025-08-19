<script setup>
import axios from 'axios'
import { ref } from 'vue'
import PlaceCard from './PlaceCard.vue'

const savedPlaces = ref([])
const getPlaces = async () => {
  if (localStorage.getItem('savedPlaces')) {
    savedPlaces.value = JSON.parse(localStorage.getItem('savedPlaces'))
  }

  const requests = []
  savedPlaces.value.forEach((place) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${place.coordinates.lat}&lon=${place.coordinates.lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      ),
    )
  })

  const weatherData = await Promise.all(requests)

  // Match up weather data to correct place
  weatherData.forEach((value, i) => {
    savedPlaces.value[i].weather = value.data
  })
  console.log(savedPlaces)
}

await getPlaces()
</script>

<template>
  <div v-for="place in savedPlaces" :key="place.id">
    <PlaceCard :place="place" />
  </div>
</template>
