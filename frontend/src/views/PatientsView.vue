<template>
  <div class="mx-auto mt-8 px-4 sm:px-8">
    <SharedDatatable
      v-if="!patientStore.arePatientsLoading"
      :data="patientStore.patients"
      :columns="[
        {
          prop: 'name',
          label: 'Nom',
          width: '25%',
        },
        {
          prop: 'phone',
          label: 'Numéro de téléphone',
          width: '25%',
        },
        {
          prop: 'birthDate',
          label: 'Date de naissance',
          width: '20%',
        },
        {
          prop: 'gender',
          label: 'Genre',
          width: '25%',
        },
        {
          prop: 'alerts',
          label: 'Alerte ouverte',
          width: '30%',
        },
      ]"
    >
      <template #birthDate="{ row: { birthDate } }">
        {{ new Date(birthDate).toLocaleDateString() }}
      </template>
      <template #gender="{ row: { gender } }">
        {{ gender === 'male' ? 'Homme' : 'Femme' }}
      </template>
      <template #conversations="{ row: { conversations } }">
        {{ conversations.length }}
      </template>
      <template #alerts="{ row: { alerts } }">
        {{ alerts.length > 0 ? 'Oui' : 'Non' }}
      </template>
    </SharedDatatable>
  </div>
</template>
<script setup lang="ts">
import SharedDatatable from '@/components/Shared/SharedDatatable.vue';
import { usePatientStore } from '@/stores/patientStore';

const patientStore = usePatientStore();
patientStore.getAll();
</script>
