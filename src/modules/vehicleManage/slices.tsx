import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toggleLoadingStatus } from '../global/slices'
import { getRescueService } from './api'

export interface UserRecord {
  name: string,
  phone: string,
  address: string,
  email: string,
  local_x: 0,
  local_y: 0,
  id: 0
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


export const vehicleSlice = createSlice({
	name: 'vehicle',
	initialState,
	reducers:{
    toggleSetKeyword: (state,action) =>{
      state.keyword = action.payload || ''
    }
	},
	extraReducers:(builder)=>{
    builder
    .addCase(getSescueServiceAsync.fulfilled,(state,action)=>{
      state.listSescue.data = action.payload;
      state.listSescue.total_account = action.payload.length;
    })
  }
})

export const { toggleSetKeyword } = vehicleSlice.actions
export default vehicleSlice.reducer