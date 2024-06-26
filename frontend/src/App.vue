<template>
  <div class="app-main">
    <AppNavbar />
    <div class="app-main__router-view p-4 bg-gray-100">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
</script>

<style lang="scss" scoped>
.app-main {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  &__router-view {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
