<template>
  <button
    class="flex items-center bg-primary-500 hover:bg-contrast-500 text-white rounded-md py-2 px-4 space-x-2 mt-2 transition duration-300 ease-in-out w-full"
  >
    <component
      :is="icon"
      class="w-5 h-5"
    />
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  icon: any;
  text: string;
}>();
</script>
