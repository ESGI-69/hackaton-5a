import type { Patient } from '@/interfaces/api';
import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patientStore', {
  state: () => ({
    arePatientsLoading: false,
    patients: [] as Patient[],
  }),

  actions: {
    async getPatients() {
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
  },
});
