import type { User } from '@/interfaces/api';
import api from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isRegisterLoading: false,
    createdUser: {} as { username: string; password: string },

    areUsersLoading: false,
    users: [] as User[],
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

    async getAll() {
      this.areUsersLoading = true;
      try {
        const {
          data: { results },
        } = await api.get('/users/');
        this.users = results;
      } finally {
        this.areUsersLoading = false;
      }
    },
  },
});
