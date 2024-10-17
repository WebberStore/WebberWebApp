import { axiosInstance, apiRequest } from './core/axios';

export const emailOrderReport = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/Reports/orders`), showLoader);
};
