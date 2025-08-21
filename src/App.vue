<template>
  <div
    class="flex flex-col min-h-screen bg-radial from-pagePrimary to-pageSecondary text-textPrimary font-display p4 sm:px-10"
  >
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'
</script>

<style lang="scss" scoped></style>
