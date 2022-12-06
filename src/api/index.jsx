import axios from 'axios';

// create axios instance
export const API = axios.create({
  baseURL: 'http://localhost:5000',
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
