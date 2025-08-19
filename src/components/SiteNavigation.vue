<script setup>
import { uid } from 'uid'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const savedPlaces = ref([])
const addPlace = () => {
  if (localStorage.getItem('savedPlaces')) {
    savedPlaces.value = JSON.parse(localStorage.getItem('savedPlaces'))
  }

  const locationObj = {
    id: uid(),
    region: route.params.region,
    country: route.params.country,
    place: route.params.place,
    coordinates: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  }

  savedPlaces.value.push(locationObj)
  localStorage.setItem('savedPlaces', JSON.stringify(savedPlaces.value))

  // Delete preview from query
  let query = Object.assign({}, route.query)
  delete query.preview
  router.replace({ query })
}
</script>

<template>
  <div>
    <header class="sticky top-0 shadow-md">
      <nav class="flex p-4 flex-col sm:flex-row items-center">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-cloud text-3xl"></i>
            <p class="text-2xl">Wevva</p>
          </div>
        </RouterLink>
        <div class="flex flex-1 justify-end">
          <i
            @click="addPlace"
            v-if="route.query.preview"
            class="fa-solid fa-plus cursor-pointer hover:text-gray-500 duration-300"
          ></i>
        </div>
      </nav>
    </header>
  </div>
</template>
