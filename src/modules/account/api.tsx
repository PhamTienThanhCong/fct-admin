import axios  from "axios";

export const updateAccount = async (id:string, params:any) => {
	return await axios.put(`/role/${id}`, params);
}
