import axios from "axios";

export const getchat = async (params:any) => {
	return await axios.get('/chat',{params:params})
}

export const createchat = async (params:any) => {
	return await axios.post('/chat',params)
}

export const updatechat = async (tag:string, params:any) => {
	return await axios.put(`/chat/${tag}`, params);
}
  
export const deletechat = async (tag: any) => {
	return await axios.delete(`/chat/${tag}`);
};