import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// create axios instance
export const API = axios.create({
  baseURL: `${SERVER_URL}` || `${BASE_URL} `,
});

// set token to axios instance
API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});
