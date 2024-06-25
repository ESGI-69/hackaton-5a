<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const register = async () => {
  await userStore.login({
    username: username.value,
    password: password.value,
  });
  router.push('/');
};
</script>

<template>
  <form
    @submit.prevent="register"
    class="flex flex-col space-y-4"
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
    <button type="submit">Register</button>
  </form>
  <button @click="router.push('/login')">Login</button>
</template>
