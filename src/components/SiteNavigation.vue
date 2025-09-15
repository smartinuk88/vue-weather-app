<script setup>
import { uid } from 'uid'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const savedPlaces = ref([])
const notification = ref(null)
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
  query.id = locationObj.id
  router.replace({ query })

  notification.value = 'Location added!'
  setTimeout(() => {
    notification.value = null
  }, 3000)
}
</script>

<template>
  <div>
    <header class="sticky top-0">
      <nav class="flex items-center justify-between px-6 py-4 sm:px-10">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-cloud text-2xl text-text-secondary"></i>
            <p class="text-2xl">Wevva</p>
          </div>
        </RouterLink>
        <div
          @click="addPlace"
          v-if="route.query.preview"
          class="flex items-center justify-center cursor-pointer text-text-primary-inverse h-6 w-6 rounded-full bg-white shadow-lg hover:opacity-80 duration-300"
        >
          <i class="fa-solid fa-plus text-xs"></i>
        </div>

        <div v-if="notification" class="text-text-secondary">
          {{ notification }}
        </div>
      </nav>
    </header>
  </div>
</template>
