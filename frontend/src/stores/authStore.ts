import api from '@/plugins/axios';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isLoginLoading: false,
    isLogged: false,
  }),

  actions: {
    async login({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      this.isLoginLoading = true;
      try {
        const {
          data: { token },
        } = await api.post('/auth/login/', {
          username,
          password,
        });
        this.isLogged = true;
        Cookies.set(import.meta.env.VITE_COOKIE_NAME, token, {
          expires: parseFloat(import.meta.env.VITE_COOKIE_DURATION || 10),
          secure: true,
        });
      } catch (error) {
        this.isLogged = true;
        throw error;
      } finally {
        this.isLoginLoading = false;
      }
    },

    logout() {
      Cookies.remove(import.meta.env.VITE_COOKIE_NAME);
      this.isLogged = false;
    },

    initLogged() {
      this.isLogged = !!Cookies.get(import.meta.env.VITE_COOKIE_NAME);
    },
  },
});
