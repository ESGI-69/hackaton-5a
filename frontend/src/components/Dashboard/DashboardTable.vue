<template>
  <div class="inline-block min-w-full shadow-light rounded-lg overflow-hidden">
    <table class="min-w-full leading-normal">
      <thead>
        <tr class="bg-primary-200">
          <th
            class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Patient
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Ouverture de l'alerte
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Raisons de l'alerte
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
          >
            Score de l'alerte
          </th>
          <th class="px-5 py-3 border-b-2 border-gray-200"></th>
        </tr>
      </thead>
      <tbody class="scroll-auto">
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="600"
        ></DashboardTableLine>
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="400"
        ></DashboardTableLine>
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="200"
        ></DashboardTableLine>
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="200"
        ></DashboardTableLine>
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="600"
        ></DashboardTableLine>
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="200"
        ></DashboardTableLine>
        <DashboardTableLine
          patient-picture="https://images.unsplash.com/photo-1442458370899-ae20e367c5d8?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          patient-name="Paulette DUPONT"
          alert-date="25 Juin à 15h00"
          alert-reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          :score="400"
        ></DashboardTableLine>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import DashboardTableLine from '@/components/Dashboard/DashboardTableLine.vue';
</script>
