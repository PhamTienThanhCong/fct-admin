import axios from "axios";

export const getRescueService = async (params:any) =>{
    return await axios.get('/rescue-service',{params:params})
}

export const createRescueService = async (params:any) =>{
    return await axios.post('/rescue-service',params)
}

export const updateRescueService = async (id:number,params:any) =>{
    return await axios.put(`/rescue-service/${id}`, params);
}

export const deleteRescueService = async (id:any) =>{
    return await axios.delete(`/rescue-service/${id}`);
}