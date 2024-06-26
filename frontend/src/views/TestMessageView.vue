<template>
  <h1>Vérification de la conversations actuelle du patient</h1>
  <label for="patient">Patient</label>
  <VueSelect
    v-if="!patientStore.arePatientsLoading"
    v-model="selectedPatientId"
    :options="
      patientStore.patients.map((patient) => ({
        value: patient.id,
        label: patient.name,
      }))
    "
  />
  <div v-else>Loading...</div>
  <div class="conv">
    <div
      v-for="message in selectedPatient?.conversations[0].messages"
      :key="message.id"
      class="message"
      :class="{
        'message--system': message.origin === 'SYSTEM',
        'message--doctor': message.origin === 'DOCTOR',
        'message--patient': message.origin === 'PATIENT',
      }"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePatientStore } from '@/stores/patientStore';
import VueSelect from 'vue3-select-component';
import { computed, ref } from 'vue';
const patientStore = usePatientStore();
patientStore.getPatients();
const selectedPatientId = ref<number | null>(null);
const selectedPatient = computed(() =>
  patientStore.patients.find(
    (patient) => patient.id === selectedPatientId.value,
  ),
);
</script>

<style lang="scss" scoped>
.patient-select {
  width: 300px;
}

.conv {
  width: 300px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .message {
    width: 70%;

    &--system {
      align-self: flex-start;
      color: #000;
      background-color: #f0f0f0;
    }

    &--doctor {
      align-self: flex-start;
      color: #fff;
      background-color: #007bff;
    }

    &--patient {
      align-self: flex-end;
      color: #000;
      background-color: plum;
      text-align: right;
    }
  }
}
</style>
