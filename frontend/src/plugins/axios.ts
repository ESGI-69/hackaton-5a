import axios from 'axios';

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

export default instance;
