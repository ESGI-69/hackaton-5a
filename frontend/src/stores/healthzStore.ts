import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useHealthzStore = defineStore('healthzStore', {
  state: () => ({
    isHealthzLoading: false,
    isApiHealthy: false,
  }),

  actions: {
    async getHealthz() {
      this.isHealthzLoading = true;
      try {
        const { data } = await api.get('/healthz');
        console.log(data);
        this.isApiHealthy = true;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.isHealthzLoading = false;
      }
    },
  },
});
