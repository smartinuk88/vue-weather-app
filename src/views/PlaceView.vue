<script setup>
import AsyncCityView from '../components/AsyncPlaceView.vue'
</script>

<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>
