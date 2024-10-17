import { axiosInstance, apiRequest } from './core/axios';

export const login = (data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/Authentication/login`, data), showLoader);
};

export const register = (data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/Authentication/register`, data), showLoader);
};

export const forgotPassword = (data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/Authentication/forgot?email=${data.email}`), showLoader);
};

export const resetPassword = (code, data, showLoader) => {
  return apiRequest(() => axiosInstance.post(`/Authentication/reset/${code}/${data.new_password}`), showLoader);
};

export const getCurrentUser = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/Users/me`), showLoader);
};

export const refreshToken = () => {
  const store = localStorage.getItem('refresh_token') ? localStorage : sessionStorage;
  return apiRequest(() => axiosInstance.post(`/Authentication/refresh`, { refresh_token: store.getItem('refresh_token') }), false).then((data) => {
    if (!data) return;
    store.setItem('access_token', data.data.access_token);
    store.setItem('refresh_token', data.data.refresh_token);
  });
};
