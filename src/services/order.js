import { axiosInstance, apiRequest } from './core/axios';

export const placeOrder = async (products, user) => {
  return await apiRequest(() =>
    axiosInstance.post(`/Orders`, {
      userId: user.id,
      "shippingAddress": {
        "street": "-",
        "city": "-",
        "state": "-",
        "postalCode": "10230",
        "country": "-",
      },
      "billingAddress": {
        "street": "-",
        "city": "-",
        "state": "-",
        "postalCode": "10230",
        "country": "-",
      },
      "currency": "LKR",
      "paymentMethod": "card",
      "shippingMethod": "-",
      "orderItems": products.map((product) => ({
        "productId": product.id,
        "quantity": 1,
        "priceAtPurchase": product.price,
      })),
    }),
  );
};

export const getAllOrders = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/Orders?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getAllOrdersNoPagination = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/Orders?${filterQuery}&${sortQuery}`));
};

export const makePayment = async (orderId) => {
  return await apiRequest(() => axiosInstance.post(`/Orders/${orderId}/payment`));
};

export const verifyPayment = async (orderId) => {
  return await apiRequest(() => axiosInstance.get(`/Orders/${orderId}/payment/verify`));
};
