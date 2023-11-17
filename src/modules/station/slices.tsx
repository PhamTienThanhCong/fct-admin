import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { StationState } from '../../types/station/station';
import { toggleLoadingStatus } from "../global/slices";
import { createStation, deleteStation, getListStation, updateStation } from "./api";


export const getListStationAsync = createAsyncThunk<any, any>(
  "station/getListStation",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const { keyword } = thunkAPI.getState().station;
      const params = keyword ? { keyword: encodeURIComponent(keyword) } : {};
      const response = await getListStation({ ...payload, ...params });
      return response.data
    } catch (error) {
      console.error("Error in getListstationAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);


export const createStationAsync = createAsyncThunk<any, any>(
  "station/create",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await createStation(payload);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response
    } catch (error) {
      console.error("Error in createCarTypeAsync:", error);
      throw error;
    }
  }
);

export const updateStationAsync = createAsyncThunk<any,  { id: number, params: any }>(
  "station/update",
  async ({ id, params }, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await updateStation(id, params);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response
    } catch (error) {
      console.error("Error in createCarTypeAsync:", error);
      throw error;
    }
  }
);

export const deleteStationAsync = createAsyncThunk<any, any>(
  "station/delete",
  async (id: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await deleteStation(id);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response
    } catch (error) {
      console.error("Error in createCarTypeAsync:", error);
      throw error;
    }
  }
);


const initialState : StationState = {
  listStation:[],
  keyword :''
}

export const stationSlice = createSlice({
  name:'station',
  initialState,
  reducers : {
    toggleSetKeyword: (state, action) => {
      state.keyword = action.payload || "";
      state.listStation = [];
    }
  },
extraReducers: (builder) => {
  builder
  .addCase(getListStationAsync.fulfilled, (state, action) => {
    const responseData = action.payload;
    const { keyword } = state;
  
    if (Array.isArray(responseData)) {
      state.listStation = responseData.filter((station: { name: string }) => 
        station.name.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      state.listStation = [responseData];
    }
  })
  
  .addCase(createStationAsync.fulfilled, (state, action)=>{
    state.listStation = [...state.listStation, action.payload]
  })

  .addCase(updateStationAsync.fulfilled, (state, action) => {
    const updatedStation = action.payload;
    const index = state.listStation.findIndex((carType) => carType.id === updatedStation.id);
  
    if (index !== -1) {
      state.listStation[index] = updatedStation;
    }
  });
}


})

export const { toggleSetKeyword } = stationSlice.actions
export default stationSlice.reducer