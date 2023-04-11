import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const { token } = useAuth();

const headers = {
  Authorization: `Bearer ${token}`
};

const api = {
  get: (url: string, params?: object) => axios.get(url, {
    headers,
    ...params
  }),

  post: (url: string, data: any) => axios.post(url, data, {
    headers
  }),

  patch: (url: string, data: any) => {
    axios.patch(url, data, {
      headers
    });
  },

  delete: <T>(url: string) => {
    axios.delete<T>(url, {
      headers
    });
  }
};

export default api;
