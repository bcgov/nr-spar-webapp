import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const { token } = useAuth();

const headers = {
  Authorization: `Bearer ${token}`
};

export const api = {
  get: <T>(url: string, params?: object) => {
    axios.get<T>(url, {
      headers,
      ...params
    });
  },

  post: <T>(url: string, data: any) => {
    axios.post<T>(url, data, {
      headers
    });
  },

  patch: <T>(url: string, data: any) => {
    axios.patch<T>(url, data, {
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
