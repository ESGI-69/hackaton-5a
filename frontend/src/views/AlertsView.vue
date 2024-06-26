<template>
  <SharedDatatable
    :columns="[
      {
        prop: 'patient',
        label: 'Patient',
        width: '100px',
      },
      {
        prop: 'createdAt',
        label: 'Ouverture de l\'alerte',
        width: '200px',
      },
      {
        prop: 'summary',
        label: 'Raisons de l\'alerte',
      },
      {
        prop: 'score',
        label: 'Score de l\'alerte',
        width: '175px',
      },
    ]"
    :data="alertStore.assignedAlerts"
    :areRowsClickable="true"
    :empty-message="'Aucune alerte assignée ouverte'"
    @row-click="(row) => router.push({ name: 'alert', params: { id: row.id } })"
  >
    <template #patient="{ row }">
      {{ row.patient.name }}
    </template>
    <template #createdAt="{ row }">
      {{ new Date(row.createdAt).toLocaleDateString() }}
    </template>
    <template #score="{ row }">
      <ScoreTag :score="row.score * 100" />
    </template>
  </SharedDatatable>
</template>

<script setup lang="ts">
import ScoreTag from '@/components/ScoreTag.vue';
import SharedDatatable from '@/components/Shared/SharedDatatable.vue';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores/alertStore';

const router = useRouter();
const alertStore = useAlertStore();
alertStore.getAssignedAlerts();
</script>
