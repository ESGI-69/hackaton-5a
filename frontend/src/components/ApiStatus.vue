<script setup lang="ts">
defineProps<{
  isApiAvaliable: boolean;
}>();
</script>

<template>
  <div
    class="api-status"
    :class="{
      'api-status--available': isApiAvaliable,
      'api-status--unavailable': !isApiAvaliable,
    }"
  >
    {{ isApiAvaliable ? 'API is available' : 'API is not available' }}
  </div>
</template>

<style scoped lang="scss">
.api-status {
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  text-align: center;

  &--available {
    background-color: green;
    color: white;
  }
  &--unavailable {
    background-color: red;
    color: white;
  }
}
</style>
