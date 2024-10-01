import axios from "axios";
import { API_BASE_URL } from "./apiUrls";
import { ACCESS_TOKEN } from "./constants";


const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            if (!config.headers) {
              config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
            if (!config.headers['Content-Type']) {
              config.headers['Content-Type'] = 'application/json';
            }
          }
          return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api