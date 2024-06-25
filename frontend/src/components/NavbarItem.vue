<template>
  <div :class="containerClass">
    <a
      v-for="item in items"
      :key="item.name"
      :href="item.href"
      class="text-grey-500 hover:text-orange-500 transition duration-300 ease-in-out"
    >
      {{ item.name }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  items: { name: string; href: string }[];
  inline?: boolean;
}>();

const containerClass = computed(() => {
  return props.inline ? 'flex space-x-8' : 'space-y-2';
});
</script>
