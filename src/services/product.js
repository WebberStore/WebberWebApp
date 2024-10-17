import { axiosInstance, apiRequest } from './core/axios';

export const getSingleProduct = async (id) => {
  return await apiRequest(() => axiosInstance.get(`/Products/${id}`));
};

export const getAllProducts = async (page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/Products?page=${page}&limit=${20}`));
};

export const createProduct = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/Products`, data));
};

export const updateProduct = async (id, data) => {
  return await apiRequest(() => axiosInstance.patch(`/Products/${id}`, data));
};

export const deleteProduct = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/Products/${id}`));
};
