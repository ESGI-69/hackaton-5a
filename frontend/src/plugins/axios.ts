import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const router = useRouter();
const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (reponse) => reponse,
  async (error) => {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      Cookies.remove(import.meta.env.VITE_COOKIE_NAME);
      router.replace('/login');
    }
    return Promise.reject(error);
  },
);

export default instance;
