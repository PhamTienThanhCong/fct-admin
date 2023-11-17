import axios from "axios";

export const getComment = async (station_id: number, params: any) => {
  return await axios.get(`/comment/${station_id}`, { params:params });
};

export const createComment = async (params: any) => {
  return await axios.post('/comment', params);
};

export const updateComment = async (id: number, params: any) => {
  return await axios.put(`/comment/${id}`, params);
};
  
export const deleteComment = async (id: number) => {
  return await axios.delete(`/comment/${id}`);
};
