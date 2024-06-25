<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <div class="p-4 bg-gray-100 flex-grow">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar
  }
});
</script>
