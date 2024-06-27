import type { Alert } from '@/interfaces/api';
import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', {
  state: () => ({
    unasignedAlerts: [] as Alert[],
    unasignedAlertsCount: 0,
    areUnasignedAlertsLoading: false,

    assignedAlerts: [] as Alert[],
    assignedAlertsCount: 0,
    areAsignedAlertsLoading: false,

    isAlertLoading: false,
    alert: {} as Alert,

    isCloseLoading: false,
  }),

  actions: {
    async getUnasignedAlerts() {
      this.areUnasignedAlertsLoading = true;
      try {
        const { data } = await api.get('/alerts/unasigned');
        this.unasignedAlertsCount = data.count;
        this.unasignedAlerts = data.results;
      } finally {
        this.areUnasignedAlertsLoading = false;
      }
    },

    async getAssignedAlerts() {
      this.areAsignedAlertsLoading = true;
      try {
        const { data } = await api.get('/alerts/assigned');
        this.assignedAlertsCount = data.count;
        this.assignedAlerts = data.results;
      } finally {
        this.areAsignedAlertsLoading = false;
      }
    },

    async getAlert(id: string) {
      this.isAlertLoading = true;
      try {
        const { data } = await api.get(`/alerts/${id}`);
        this.alert = data;
      } finally {
        this.isAlertLoading = false;
      }
    },

    async close(alertId: number, message: string) {
      this.isCloseLoading = true;
      try {
        await api.post(`/alerts/${alertId}/close`, { message });
      } finally {
        this.isCloseLoading = false;
      }
    },
  },
});
