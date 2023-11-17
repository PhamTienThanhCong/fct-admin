import axios from "axios"

export const getlistStationPorts = async (station_id: string) => {
    return await axios.get(`/port/s/${station_id}`);
  };

export const createlistStationPorts = async ( params: any) => {
    return await axios.post('/port', params );
};

export const updatelistStationPorts = async (id: any, params: any) => {
    return await axios.put(`/port/${id}`, { params });
};

export const deletelistStationPorts = async (id: any) => {
    return await axios.delete(`/port/s/${id}`);
};
