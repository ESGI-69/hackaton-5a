<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomButton from '@/components/CustomButton.vue';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
  await authStore.login({
    username: username.value,
    password: password.value,
  });
  router.push('/');
};
</script>

<template>
  <div class="login-bg">
    <div class="bg-white w-4/12 mx-auto p-12 mt-28 rounded-md shadow-light">
      <h1 class="text-2xl text-primary-500 text-center pb-12">Se connecter</h1>
      <form
        @submit.prevent="login"
        class="flex flex-col space-y-8"
      >
        <div class="flex flex-col">
          <label
            for="username"
            class="text-contrast-500 pb-2"
            >Identifiant</label
          >
          <input
            class="rounded-md border border-gray-200 hover:border-gray-300 transition duration-300 ease-in-out p-2 focus:outline-none text-grey-300"
            type="text"
            name="username"
            id="username"
            v-model="username"
          />
        </div>

        <div class="flex flex-col">
          <label
            for="password"
            class="text-contrast-500 pb-2"
            >Mot de passe</label
          >
          <input
            class="rounded-md border border-gray-200 hover:border-gray-300 transition duration-300 ease-in-out p-2 focus:outline-none text-grey-300"
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
          <p class="text-grey-300 font-light text-sm mt-2 text-right">
            J'ai oublié mon mot de passe
          </p>
        </div>

        <CustomButton
          class="py-2 w-fit ml-auto"
          type="submit"
          text="Connexion"
        />
      </form>
      <div class="text-sm pt-8">
        <span class="text-grey-300 font-light">
          Vous n'avez pas encore de compte ? </span
        ><br />
        <button
          class="text-primary-500 hover:text-contrast-500 transition duration-300 ease-in-out"
          @click="router.push('/register')"
        >
          En créer un maintenant !
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: url('../assets/oooscillate.svg') no-repeat center center fixed;
  background-size: cover;
}
</style>
