import { axiosInstance, apiRequest } from './core/axios';

export const getTotals = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/Dashboard/totals`), showLoader);
};

export const getProfitData = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/Dashboard/profits`), showLoader);
};
