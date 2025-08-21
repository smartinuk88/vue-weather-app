<script setup>
import SkeletonPlaceView from '@/components/SkeletonPlaceView.vue'
import AsyncPlaceView from '../components/AsyncPlaceView.vue'
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
