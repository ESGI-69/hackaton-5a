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
    // Do something before request is sent
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
  },
);

export default instance;
