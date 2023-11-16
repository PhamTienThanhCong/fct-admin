import axios from "axios";

export const getOrders = async (params: any) => {
  return await axios.get('/order', { params: params });
}

export const createOrder = async (params: any) => {
  return await axios.post('/order/create', params);
}

export const updateOrder = async (id: any, params: any, accept_type: string) => {
  return await axios.put(`/order/${accept_type}/${id}`, params);
}
