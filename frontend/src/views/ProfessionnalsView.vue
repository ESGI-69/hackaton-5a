<template>
  <div class="mx-auto mt-8 px-4 sm:px-8">
    <h1
      class="text-2xl font-bold mb-8 text-contrast-500 border-b border-secondary-400"
    >
      Liste des professionnels de santé
    </h1>
    <SharedDatatable
      id="table"
      v-if="!userStore.areUsersLoading"
      :data="userStore.users"
      :columns="[
        {
          prop: 'name',
          label: 'Nom',
          width: '40%',
        },
        {
          prop: 'createdAt',
          label: 'Date d\'inscription',
          width: '60%',
        },
      ]"
    >
      <template #createdAt="{ row: { createdAt } }">
        {{ new Date(createdAt).toLocaleDateString() }}
      </template>
    </SharedDatatable>
  </div>
</template>
<script setup lang="ts">
import SharedDatatable from '@/components/Shared/SharedDatatable.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
userStore.getAll();
</script>

<style scoped>
#table {
  min-width: inherit !important;
}
</style>
