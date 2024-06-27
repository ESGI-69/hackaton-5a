<template>
  <div class="mx-auto mt-8 px-4 sm:px-8">
    <h1 class="text-2xl font-bold mb-8 mx-auto w-fit text-grey-500">
      Liste des alertes
    </h1>
    <SharedDatatable
      :columns="[
        {
          prop: 'score',
          label: 'Score de l\'alerte',
          width: '15%',
        },
        {
          prop: 'patient',
          label: 'Patient',
          width: '20%',
        },
        {
          prop: 'createdAt',
          label: 'Ouverture de l\'alerte',
          width: '25%',
        },
        {
          prop: 'responsible',
          label: 'Responsable',
          width: '10%',
        },
        {
          prop: 'summary',
          label: 'Raisons de l\'alerte',
          width: '40%',
        },
      ]"
      :has-actions="true"
      :data="alertStore.assignedAlerts"
      :areRowsClickable="true"
      :empty-message="'Aucune alerte assignée ouverte'"
      @row-click="
        (row) => router.push({ name: 'alert', params: { id: row.id } })
      "
    >
      <template #patient="{ row }">
        {{ row.patient.name }}
      </template>
      <template #createdAt="{ row }">
        {{ new Date(row.createdAt).toLocaleDateString() }}
      </template>
      <template #score="{ row }">
        <ScoreTag :score="row.score" />
      </template>
      <template #responsible="{ row }">
        {{ row.responsible?.name || 'Non assignée' }}
      </template>
      <template #actions>
        <CustomButton text="Voir" />
      </template>
    </SharedDatatable>
  </div>
</template>

<script setup lang="ts">
import ScoreTag from '@/components/ScoreTag.vue';
import SharedDatatable from '@/components/Shared/SharedDatatable.vue';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores/alertStore';
import CustomButton from '@/components/CustomButton.vue';

const router = useRouter();
const alertStore = useAlertStore();
alertStore.getAssignedAlerts();
</script>
