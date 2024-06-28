<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomButton from '@/components/CustomButton.vue';

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
  <div class="register-bg">
    <div class="bg-white w-4/12 mx-auto p-12 mt-28 rounded-md shadow-light">
      <h1 class="text-2xl text-primary-500 text-center pb-12">
        Création de compte
      </h1>
      <form
        @submit.prevent="register"
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

        <div>
          <div class="flex flex-col mb-4">
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
          </div>
          <div class="flex flex-col">
            <label
              for="password"
              class="text-contrast-500 pb-2"
              >Confirmation du mot de passe</label
            >
            <input
              class="rounded-md border border-gray-200 hover:border-gray-300 transition duration-300 ease-in-out p-2 focus:outline-none text-grey-300"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </div>
        <CustomButton
          class="py-2 w-fit ml-auto"
          type="submit"
          text="Commencer"
        />
      </form>
      <div class="text-sm pt-8">
        <span class="text-grey-300 font-light">Vous avez déjà un compte ? </span
        ><br />
      </div>
      <button
        class="text-primary-500 hover:text-contrast-500 transition duration-300 ease-in-out"
        @click="router.push('/login')"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>

<style scoped>
.register-bg {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: url('../assets/oooscillate.svg') no-repeat center center fixed;
  background-size: cover;
}
</style>
