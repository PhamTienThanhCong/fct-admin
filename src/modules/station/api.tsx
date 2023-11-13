import axios from "axios";

export const getListStation = async (params:any) =>{
    return await axios.get('/station',{params:params})
}

export const createStation = async (params:any) =>{
    return await axios.post('/station',params)
}

export const updateStation = async (id:number,params:any) =>{
    return await axios.put(`/station/${id}`,params)
}

export const deleteStation = async (id:any) =>{
    return await axios.delete(`/station/${id}`)
}