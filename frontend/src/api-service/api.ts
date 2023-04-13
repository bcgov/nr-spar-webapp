import axios from 'axios';

const token = localStorage.getItem('token');

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

  put: (url: string, data: any) => axios.put(url, data, {
    headers
  }),

  patch: (url: string, data: any) => axios.patch(url, data, {
    headers
  }),

  delete: (url: string) => axios.delete(url, {
    headers
  })
};

export default api;
