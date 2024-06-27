<template>
  <div class="patient-view">
    <h1>Patients</h1>
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
          width: '25%',
        },
        {
          prop: 'gender',
          label: 'Genre',
          width: '25%',
        },
        {
          prop: 'conversations',
          label: 'Nombre de conversations',
          width: '25%',
        },
      ]"
    >
      <template #birthDate="{ row: { birthDate } }">
        {{ new Date(birthDate).toLocaleDateString() }}
      </template>
      <template #conversations="{ row: { conversations } }">
        {{ conversations.length }}
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
