<template>
  <button
    class="px-4 py-1 bg-secondary-400 hover:bg-secondary-500 text-sm text-white rounded-[4px] transition duration-300 ease-in-out"
  >
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
}>();
</script>
