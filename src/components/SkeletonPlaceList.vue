<script setup>
import SkeletonLoader from './SkeletonLoader.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="h-[160px] w-full"
    />
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="h-[160px] w-full"
    />
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="h-[160px] w-full"
    />
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="h-[160px] w-full"
    />
  </div>
</template>
