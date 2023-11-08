import axios from "axios";

export const getRescueService = async (params:any) =>{
    return await axios.get('/rescue-service/',{params:params})
}