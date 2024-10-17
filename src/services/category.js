import { axiosInstance, apiRequest } from './core/axios';

export const getAllCategories = async () => {
  return await apiRequest(() => axiosInstance.get(`/Categories`));
};

