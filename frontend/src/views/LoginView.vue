<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
</script>

<template>
  <form
    @submit="
      authStore.login({
        username,
        password,
      })
    "
  >
    <label for="username">Username</label>
    <input
      type="text"
      name="username"
      id="username"
      v-model="username"
    />
    <label for="password">password</label>
    <input
      type="password"
      name="password"
      id="password"
      v-model="password"
    />
    <input
      type="submit"
      value="Submit"
    />
  </form>
</template>
