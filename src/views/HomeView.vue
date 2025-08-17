<script setup>
import axios from 'axios'
import { ref } from 'vue'

const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      const result = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&types=place&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`,
      )
      mapboxSearchResults.value = result.data.features
      console.log(mapboxSearchResults.value)
      return
    }
    mapboxSearchResults.value = null
  }, 300)
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
      <ul class="w-full p-4">
        <li
          v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        >
          {{ searchResult.properties.full_address }}
        </li>
      </ul>
    </div>
  </main>
</template>
