<template>
  <h1>Vérification de la conversations actuelle du patient</h1>
  <VueSelect
    placeholder="sélectionnez un patient"
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

  <ChatMessages
    class="conv"
    v-if="selectedPatient"
    :messages="selectedPatient.conversations[0].messages"
  />
  <div class="message-input">
    <input
      type="text"
      v-model="newMessage"
      placeholder="Entre votre message..."
    />
    <button
      @click="sendMessage"
      :disabled="!selectedPatientId || patientStore.isSendMessageLoading"
    >
      Send
    </button>
  </div>
  <p v-if="patientStore.isSendMessageLoading">Envoie du message...</p>
</template>

<script lang="ts" setup>
import 'vue3-select-component/dist/style.css';
import { usePatientStore } from '@/stores/patientStore';
import VueSelect from 'vue3-select-component';
import ChatMessages from '@/components/ChatMessages.vue';
import { computed, ref } from 'vue';
const patientStore = usePatientStore();
patientStore.getAll();
const selectedPatientId = ref<number | null>(null);
const selectedPatient = computed(() =>
  patientStore.patients.find(
    (patient) => patient.id === selectedPatientId.value,
  ),
);

const newMessage = ref('');

const sendMessage = async () => {
  if (newMessage.value.trim() !== '' && selectedPatient.value) {
    await patientStore.sendMessage(selectedPatient.value.id, newMessage.value);
    patientStore.patients[
      patientStore.patients.findIndex(
        (patient) => patient.id === selectedPatient.value?.id,
      )
      // @ts-ignore
    ].conversations[0].messages.push({
      id: Math.random(),
      origin: 'PATIENT',
      text: newMessage.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    newMessage.value = '';
  }
};
</script>

<style lang="scss" scoped>
.patient-select {
  width: 300px;
}

.conv {
  height: 70%;
}

.message-input {
  display: flex;
  gap: 10px;
  margin-top: 20px;

  input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
