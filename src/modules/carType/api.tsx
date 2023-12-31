import axios from "axios";

export const getCarType = async (params:any) => {
	return await axios.get('/car-type',{params:params})
}

export const createCarType = async (params:any) => {
	return await axios.post('/car-type',params)
}

export const updateCarType = async (id:string, params:any) => {
	return await axios.put(`/car-type/${id}`, params);
}
  
export const deleteCarType = async (id: any) => {
	return await axios.delete(`/car-type/${id}`);
};