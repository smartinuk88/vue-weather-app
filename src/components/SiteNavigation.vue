<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <header class="sticky top-0 shadow-md">
      <nav class="flex p-4 flex-col sm:flex-row items-center">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-cloud text-3xl"></i>
            <p class="text-2xl">Wevva</p>
          </div>
        </RouterLink>
        <div class="flex flex-1 justify-end">
          <i class="fa-solid fa-plus cursor-pointer"></i>
        </div>
      </nav>
    </header>
  </div>
</template>
