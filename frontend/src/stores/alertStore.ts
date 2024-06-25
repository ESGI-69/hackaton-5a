import type { Alert } from '@/interfaces/api';
import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', {
  state: () => ({
    alerts: [] as Alert[],
    alertsCount: 0,
    areAlertsLoading: false,
  }),
  actions: {
    async getAlerts() {
      this.areAlertsLoading = true;
      try {
        const { data } = await api.get('/alerts/');
        this.alertsCount = data.count;
        this.alerts = data.results;
      } finally {
        this.areAlertsLoading = false;
      }
    },
  },
});
