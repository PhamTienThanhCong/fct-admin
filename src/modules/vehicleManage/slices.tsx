import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toggleLoadingStatus } from '../global/slices'
import { createRescueService, deleteRescueService, getRescueService, updateRescueService } from './api'

export interface UserRecord {
  name: string,
  phone: string,
  address: string,
  email: string,
  local_x: number,
  local_y: number,
  id: number
}

interface SescueService{
  listSescue:{
    data : UserRecord[],
    total_account:number
  },
  keyword:string
}

const initialState : SescueService = {
  listSescue:{
    data : [],
    total_account: 0
  },
  keyword:'',
}

export const getSescueServiceAsync = createAsyncThunk<any,any>(
	'service/serviceSescue', 
	async(payload: any, thunkAPI:any)=>{
  try {
    thunkAPI.dispatch(toggleLoadingStatus())
    const { keyword } = thunkAPI.getState().vehicle
    const params = keyword ? {keyword : encodeURIComponent(keyword)} : {}
    const response = await getRescueService({
      ...params,
      ...payload
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }finally {
    thunkAPI.dispatch(toggleLoadingStatus());
  }
}) 

export const createVehicleAsync = createAsyncThunk<any, any>(
  "service/create",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await createRescueService(payload);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updateVehicleAsync = createAsyncThunk<any, { id: number, params: any }>(
  'service/update',
  async ({ id, params }, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await updateRescueService(id, params);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


export const deleteVehicleAsync = createAsyncThunk<any, any>(
  "service/delete",
  async (id: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await deleteRescueService(id);
      return response
    } catch (error) {
      console.error("Error in deleteCarTypeAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);

export const vehicleSlice = createSlice({
	name: 'vehicle',
	initialState,
	reducers:{
    toggleSetKeyword: (state,action) =>{
      state.keyword = action.payload || ''
    },
    
	},
	extraReducers:(builder)=>{
    builder
    .addCase(getSescueServiceAsync.fulfilled,(state,action)=>{
      const responseData = action.payload;
      const { keyword } = state;
      if(Array.isArray(responseData)){
        state.listSescue.data = responseData.filter((sescue:{name:string})=>
          sescue.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }else{
        state.listSescue.data = [responseData]
      }
      state.listSescue.total_account = state.listSescue.data.length;
    })
    .addCase(createVehicleAsync.fulfilled,(state,action)=>{
      state.listSescue.data = [...state.listSescue.data,action.payload]
    })
    .addCase(updateVehicleAsync.fulfilled,(state,action)=>{
      const updatevehicle = action.payload;
      const index = state.listSescue.data.findIndex((vehicle)=>vehicle.id === updatevehicle.id)
      
      if(index !== -1){
        state.listSescue.data[index] = updatevehicle
      }
    })
  }
})

export const { toggleSetKeyword } = vehicleSlice.actions
export default vehicleSlice.reducer