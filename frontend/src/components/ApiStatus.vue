<script setup lang="ts">
import { NCode } from 'naive-ui';
defineProps<{
  isApiAvaliable: boolean;
  isLoading: boolean;
  error: object;
}>();
</script>

<template>
  <div
    class="api-status--loading"
    v-if="isLoading"
  >
    Check in progress
  </div>
  <div
    v-else
    class="api-status"
    :class="{
      'api-status--available': isApiAvaliable,
      'api-status--unavailable': !isApiAvaliable,
    }"
  >
    {{ isApiAvaliable ? 'API is available' : 'API is not available' }}
    <NCode
      v-if="error"
      class="api-status__info"
      :code="JSON.stringify(error, null, 2)"
      language="json"
      show-line-numbers
    />
  </div>
</template>

<style scoped lang="scss">
.api-status {
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;

  &--available {
    background-color: green;
    color: white;
  }

  &--unavailable {
    background-color: red;
    color: white;
  }

  &__info {
    padding: 1rem;
    background-color: black;
  }
}
</style>
