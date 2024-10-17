import { axiosInstance, apiRequest } from './core/axios';

export const createTicket = async (ticket) => {
  return await apiRequest(() => axiosInstance.post(`/Tickets/`, ticket));
};

export const getAllTickets = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/Tickets?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getTicket = async (ticketId) => {
  return await apiRequest(() => axiosInstance.get(`/Tickets/${ticketId}`));
};

export const addReply = async (ticketId, message) => {
  return await apiRequest(() => axiosInstance.post(`/Tickets/${ticketId}/reply`, { message }));
};

export const closeTicket = async (ticketId) => {
  return await apiRequest(() => axiosInstance.patch(`/Tickets/${ticketId}/close`));
};
