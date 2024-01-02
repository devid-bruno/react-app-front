import axios, { Axios } from 'axios';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';

import { logout } from '../services/auth'

import { apiUrl, loginUrl } from '../envs';

export const api: Axios = axios.create({
  baseURL: apiUrl ? apiUrl : 'http://127.0.0.1:8000',
  headers: {
    'Bypass-tunnel-Reminder': 'qwre'
  }
})

function checkValidation(config: any) {
  if (config.url === loginUrl) {
    return config;
  }

  const { 'bb.token': token } = parseCookies();

  if (token) {
    const decodedToken: any = jwt_decode(token);

    if (Date.now() >= decodedToken.exp * 1000) {
      logout();
    } else {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
      };
    }
  }

  return config;
}

api.interceptors.request.use(checkValidation);
