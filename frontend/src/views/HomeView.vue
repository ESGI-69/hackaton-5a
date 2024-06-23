<script setup lang="ts">
import ApiStatus from '@/components/ApiStatus.vue';
import { NButton } from 'naive-ui';
import { useHealthzStore } from '@/stores/healthzStore';
import { ref } from 'vue';

const healthzStore = useHealthzStore();

const apiHasBeenCalled = ref(false);

const checkApiStatus = async () => {
  await healthzStore.getHealthz();
  apiHasBeenCalled.value = true;
};
</script>

<template>
  <main>
    <NButton @click="checkApiStatus">Test API</NButton>
    <ApiStatus
      v-if="apiHasBeenCalled"
      :is-api-avaliable="healthzStore.isApiHealthy"
    />
  </main>
</template>
