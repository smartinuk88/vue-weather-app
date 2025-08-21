<script setup>
import SkeletonLoader from './SkeletonLoader.vue'
</script>

<template>
  <div class="flex-1 flex flex-col items-center p-6 text-center mx-auto max-w-4xl">
    <!-- Weather Overview -->
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="w-full h-[288px] mb-20"
    />

    <!-- Current Weather Data -->

    <h2 class="mb-4 text-lg">Current Weather</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full mb-20">
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
      <SkeletonLoader
        bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
        class="w-[200px] h-[200px]"
      />
    </div>

    <!-- Weather Hourly & Weekly -->

    <h2 class="mb-4 text-lg">Hourly Forecast</h2>
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="w-full h-[180px] mb-10"
    />

    <h2 class="mb-4 text-lg">7-Day Forecast</h2>
    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="w-full h-[180px] mb-10"
    />

    <SkeletonLoader
      bgClass="bg-linear-to-br from-pagePrimary to-pageSecondary"
      class="w-[130px] h-[28px]"
    />
  </div>
</template>
