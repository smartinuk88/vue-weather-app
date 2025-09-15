<template>
  <div
    class="flex flex-col min-h-screen bg-radial from-primary-gradient-start to-primary-gradient-end text-white font-display p4 sm:px-10"
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
