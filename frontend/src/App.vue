<template>
  <div class="flex flex-col h-screen">
    <AppNavbar />
    <div class="p-4 bg-gray-100 flex-grow">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
</script>
