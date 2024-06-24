<script setup lang="ts">
import ApiStatus from '@/components/ApiStatus.vue';
import { NButton } from 'naive-ui';
import { useHealthzStore } from '@/stores/healthzStore';
import { ref } from 'vue';

const healthzStore = useHealthzStore();

const apiHasBeenCalled = ref(false);

const checkApiStatus = async () => {
  apiHasBeenCalled.value = true;
  await healthzStore.getHealthz();
};
</script>

<template>
  <main
    class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
  >
    <NButton @click="checkApiStatus">Test API</NButton>
    <ApiStatus
      v-if="apiHasBeenCalled"
      :is-loading="healthzStore.isHealthzLoading"
      :is-api-avaliable="healthzStore.isApiHealthy"
      :error="healthzStore.healthError"
    />
  </main>
</template>
