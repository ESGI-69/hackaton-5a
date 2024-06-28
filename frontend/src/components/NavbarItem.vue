<template>
  <div :class="containerClass">
    <RouterLink
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.routeName }"
      class="text-primary-500 hover:text-contrast-500 transition duration-300 ease-in-out"
      :class="{
        underline: $route.name === item.routeName,
      }"
    >
      {{ item.name }}
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  items: { name: string; routeName: string }[];
  inline?: boolean;
}>();

const containerClass = computed(() => {
  return props.inline ? 'flex space-x-8' : 'space-y-2';
});
</script>
