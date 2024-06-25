<template>
  <div class="mx-auto px-4 sm:px-8">
    <div class="pulsating-circle-container">
      <div class="pulsating-circle">
        <div class="circle-text">
          <div class="text-4xl font-bold">{{ alertStore.alertsCount }}</div>
          <div class="font-bold">alertes</div>
        </div>
      </div>
    </div>
    <div class="table-container -mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
      <SharedDatatable
        :columns="[
          {
            prop: 'id',
            label: 'ID',
          },
          {
            prop: 'updatedAt',
            label: 'Last Activity',
          },
          {
            prop: 'score',
            label: 'Score',
          },
        ]"
        :data="alertStore.alerts"
      >
        <template #updatedAt="{ row }">
          {{ new Date(row.updatedAt).toLocaleString() }}
        </template>
      </SharedDatatable>
      <DashboardTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardTable from '@/components/Dashboard/DashboardTable.vue';
import SharedDatatable from '@/components/Shared/SharedDatatable.vue';
import { useAlertStore } from '@/stores/alertStore';

const alertStore = useAlertStore();
alertStore.getAlerts();
console.log('alertStore', alertStore);
</script>

<style scoped>
body {
  background: #454a59;
}

.pulsating-circle-container {
  position: relative;
  width: 100%;
  height: 200px;
}

.pulsating-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
}

.pulsating-circle::before {
  content: '';
  position: absolute;
  display: block;
  width: 130%;
  height: 130%;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #a09ae1;
  animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.pulsating-circle::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.06);
  animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
}

.circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1em;
  color: #a09ae1;
  z-index: 1;
}

.table-container {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.33);
  }
  80%,
  100% {
    opacity: 0;
  }
}

@keyframes pulse-dot {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>
