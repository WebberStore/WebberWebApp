import { axiosInstance, apiRequest } from './core/axios';

export const createUser = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/Authentication/register`, {
    ...data,
    firstName: "-",
    lastName: "-",
    password: "P@ssw0rd",
    confirmPassword: "P@ssw0rd",
    role: "Admin",
    address: {
      city: "-",
      state: "-",
      country: "-",
      postalCode: "-",
      street: "-"
    }
  }));
};

export const getAllUsers = async () => {
  return await apiRequest(() => axiosInstance.get(`/Users`));
};

export const updateUser = async (id, data) => {
  return await apiRequest(() => axiosInstance.patch(`/Users/${id}`, data));
};

export const deleteUser = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/Users/${id}`));
};
