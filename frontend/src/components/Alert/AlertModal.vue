<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="bg-white rounded-lg p-8 w-1/2">
      <div
        class="flex justify-between items-center pb-4 border-b border-gray-300"
      >
        <h3 class="text-lg font-bold text-contrast-500">{{ title }}</h3>
        <button @click="closeModal">
          <svg
            class="w-6 h-6 text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div class="mt-4">
        <slot></slot>
        <button @click="$emit('confirm')">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isOpen: boolean;
  title: string;
  btnText: string;
}>();

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};
</script>
