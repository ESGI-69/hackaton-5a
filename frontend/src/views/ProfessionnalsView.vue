<template>
  <div class="user-view">
    <h1>Professionnels</h1>
    <SharedDatatable
      v-if="!userStore.areUsersLoading"
      :data="userStore.users"
      :columns="[
        {
          prop: 'name',
          label: 'Nom',
          width: '25%',
        },
        {
          prop: 'createdAt',
          label: 'Date d\'inscription',
          width: '75%',
        },
      ]"
    >
    </SharedDatatable>
  </div>
</template>
<script setup lang="ts">
import SharedDatatable from '@/components/Shared/SharedDatatable.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
userStore.getAll();
</script>
