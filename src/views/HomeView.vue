<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&types=place&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`,
        )
        mapboxSearchResults.value = result.data.features
      } catch {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}

const previewCity = (searchResult) => {
  router.push({
    name: 'cityView',
    params: {
      region: searchResult.properties.context.region.name,
      country: searchResult.properties.context.country.name,
      place: searchResult.properties.context.place.name,
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lon: searchResult.geometry.coordinates[0],
      preview: true,
    },
  })
}
</script>

<template>
  <main class="p-2">
    <div class="p-4">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city"
        class="py-2 px-1 w-full bg-transparent border focus:outline-none focus:shadow-md"
      />
      <ul v-if="mapboxSearchResults" class="w-full p-4">
        <p v-if="searchError">Sorry, an error occurred. Please try again</p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query. Use a different search term
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            @click="previewCity(searchResult)"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.properties.full_address }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
