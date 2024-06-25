import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isRegisterLoading: false,
    createdUser: {} as { username: string; password: string },
  }),

  actions: {
    async login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      this.isRegisterLoading = true;
      try {
        const { data } = await api.post('/users/', {
          username,
          password,
        });
        this.createdUser = data;
      } finally {
        this.isRegisterLoading = false;
      }
    },
  },
});
