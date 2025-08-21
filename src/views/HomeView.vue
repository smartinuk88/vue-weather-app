<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref, Suspense } from 'vue'
import PlaceList from '@/components/PlaceList.vue'

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

const previewPlace = (searchResult) => {
  router.push({
    name: 'placeView',
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
  <main class="pt-0 pb-10 px-4 sm:px-10 w-full max-w-6xl mx-auto">
    <div>
      <div class="mb-12">
        <input
          type="text"
          v-model="searchQuery"
          @input="getSearchResults"
          placeholder="Search for a location"
          class="px-4 py-1 w-full bg-weatherSecondary text-textSecondary border border-weatherSecondary inset-shadow-sm rounded-md focus:outline-none focus:border-weatherQuaternary mb-4"
        />

        <ul v-if="mapboxSearchResults" class="w-full flex flex-col gap-2">
          <p v-if="searchError">Sorry, an error occurred. Please try again</p>
          <p v-if="!searchError && mapboxSearchResults.length === 0">
            No results match your query. Use a different search term
          </p>
          <template v-else>
            <li
              v-for="searchResult in mapboxSearchResults"
              @click="previewPlace(searchResult)"
              :key="searchResult.id"
              class="px-4 py-2 cursor-pointer bg-textQuaternary opacity-95 text-sm text-textSecondary rounded-md hover:opacity-80 duration-300"
            >
              {{ searchResult.properties.full_address }}
            </li>
          </template>
        </ul>
      </div>

      <section>
        <h2 class="text-xl mb-4">Your locations</h2>
        <div>
          <Suspense>
            <PlaceList />
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
        </div>
      </section>
    </div>
  </main>
</template>
