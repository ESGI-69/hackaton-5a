import type { Patient } from '@/interfaces/api';
import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    arePatientsLoading: false,
    patients: [] as Patient[],
    isSendMessageLoading: false,
  }),

  actions: {
    async getAll() {
      this.arePatientsLoading = true;
      try {
        const {
          data: { results },
        } = await api.get('/patients');
        this.patients = results;
      } finally {
        this.arePatientsLoading = false;
      }
    },

    async sendMessage(patientId: number, message: string) {
      this.isSendMessageLoading = true;
      try {
        await api.post(`/patients/${patientId}/message`, {
          message,
        });
      } finally {
        this.isSendMessageLoading = false;
      }
    },
  },
});
