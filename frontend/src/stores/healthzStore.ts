import api from '@/plugins/axios';
import { AxiosError } from 'axios';
import { defineStore } from 'pinia';

export const useHealthzStore = defineStore('healthzStore', {
  state: () => ({
    isHealthzLoading: false,
    isApiHealthy: false,
    healthError: {},
  }),

  actions: {
    async getHealthz() {
      this.isHealthzLoading = true;
      try {
        const { data } = await api.get('/healthz');
        console.log(data);
        this.isApiHealthy = true;
        this.healthError = {};
      } catch (error) {
        this.isApiHealthy = false;
        if (error instanceof AxiosError) {
          this.healthError = error.response?.data;
        }
        throw error;
      } finally {
        this.isHealthzLoading = false;
      }
    },
  },
});
