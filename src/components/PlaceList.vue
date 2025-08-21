<script setup>
import axios from 'axios'
import { ref } from 'vue'
import PlaceCard from './PlaceCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
}

await getPlaces()

const goToPlaceView = (place) => {
  router.push({
    name: 'placeView',
    params: {
      region: place.region,
      country: place.country,
      place: place.place,
    },
    query: {
      id: place.id,
      lat: place.coordinates.lat,
      lon: place.coordinates.lat,
    },
  })
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div v-for="place in savedPlaces" :key="place.id">
        <PlaceCard :place="place" @click="goToPlaceView(place)" />
      </div>
    </div>

    <p class="text-textSecondary text-sm" v-if="savedPlaces.length === 0">
      No locations added. Use search bar above to get started adding locations
    </p>
  </div>
</template>
