<template>
  <button
    class="px-4 py-1 bg-primary-500 hover:bg-contrast-500 text-sm text-white rounded-[4px] transition duration-300 ease-in-out"
  >
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
}>();
</script>
