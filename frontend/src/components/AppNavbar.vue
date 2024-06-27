<template>
  <nav class="bg-white p-4 shadow-light z-10">
    <div class="mx-auto px-4 sm:px-8 flex justify-between items-center">
      <div class="text-gray-500 text-xl logo">
        <img
          src="../assets/logo-purple-full.png"
          alt="MediFlow"
          class="h-8"
        />
      </div>
      <div class="hidden md:flex">
        <NavbarItem
          :items="menuItems"
          :inline="true"
        />
      </div>
      <button
        @click="toggleMenu"
        class="text-grey-500 hover:text-orange-500 md:hidden"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
    </div>
    <div
      v-if="isMenuOpen"
      class="md:hidden mt-2"
    >
      <NavbarItem :items="menuItems" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Bars3Icon } from '@heroicons/vue/24/solid';
import NavbarItem from './NavbarItem.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const menuItems = [
  { name: 'TEST MESSAGE SEND', routeName: 'test-message' },
  { name: 'Dashboard', routeName: 'dashboard' },
  { name: 'Alertes', routeName: 'alerts' },
  // { name: 'Rendez-vous', routeName: 'appointments' },
  { name: 'Professionnels', routeName: 'professionnals' },
  { name: 'Patients', routeName: 'patients' },
];
</script>

<style>
.logo {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}
</style>
