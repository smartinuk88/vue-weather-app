<script setup>
import SkeletonPlaceView from '@/components/SkeletonPlaceView.vue'
// import AsyncPlaceView from '../components/AsyncPlaceView.vue'
import { defineAsyncComponent } from 'vue'

const AsyncPlaceView = defineAsyncComponent(() => new Promise(() => {}))
</script>

<template>
  <div>
    <Suspense>
      <AsyncPlaceView />
      <template #fallback>
        <SkeletonPlaceView />
      </template>
    </Suspense>
  </div>
</template>
