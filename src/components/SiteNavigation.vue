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
  query.id = locationObj.id
  router.replace({ query })
}
</script>

<template>
  <div>
    <header class="sticky top-0">
      <nav class="flex items-center justify-between p-4 sm:px-10">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-cloud text-2xl text-textSecondary"></i>
            <p class="text-2xl">Wevva</p>
          </div>
        </RouterLink>
        <div
          @click="addPlace"
          v-if="route.query.preview"
          class="flex items-center justify-center cursor-pointer text-pagePrimary h-6 w-6 rounded-full bg-textPrimary shadow-lg hover:opacity-80 duration-300"
        >
          <i class="fa-solid fa-plus text-xs"></i>
        </div>
      </nav>
    </header>
  </div>
</template>
