import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices";
import { createlistStationPorts, deletelistStationPorts, getlistStationPorts, updatelistStationPorts } from "./api";
import { stationPortsState } from "../../types/stationPorts/stationPorts";

export const getListPortsTypeAsync = createAsyncThunk<any, any>(
	"stationPorts/getStationPorts",
	async (params, thunkAPI) => {
	  try {
		thunkAPI.dispatch(toggleLoadingStatus());
		const response = await getlistStationPorts(params);
		return response.data;
	  } catch (error) {
		console.error("Error in getListPortsTypeAsync:", error);
		throw error;
	  } finally {
		thunkAPI.dispatch(toggleLoadingStatus());
	  }
	}
  );
  

export const createPortsTypeAsync = createAsyncThunk<any, any>(
  "stationPorts/create",
  async (payload: any, thunkAPI: any) => {
	try {
	  thunkAPI.dispatch(toggleLoadingStatus());
	  const response = await createlistStationPorts(payload);
	  thunkAPI.dispatch(toggleLoadingStatus());
	  return response
	} catch (error) {
	  console.error("Error in createCarTypeAsync:", error);
	  throw error;
	}
  }
);


export const updatePortsTypeAsync = createAsyncThunk<any, { id: string, params: any }>(
  'stationPorts/update',
  async ({ id, params }, thunkAPI: any) => {
	try {
	  thunkAPI.dispatch(toggleLoadingStatus());
	  const response = await updatelistStationPorts(id, params);
	  thunkAPI.dispatch(toggleLoadingStatus());
	  return response.data;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }
);


export const deletePortsTypeAsync = createAsyncThunk<any, any>(
  "stationPorts/delete",
  async (id: any, thunkAPI: any) => {
	try {
	  thunkAPI.dispatch(toggleLoadingStatus());
	  const response = await deletelistStationPorts(id);
	  return response
	} catch (error) {
	  console.error("Error in deleteCarTypeAsync:", error);
	  throw error;
	} finally {
	  thunkAPI.dispatch(toggleLoadingStatus());
	}
  }
);

const initialState: stationPortsState = {
  listStationPorts:[],
  keyword:''
};

export const stationPortsSlice = createSlice({
  name: "stationPorts",
  initialState,
  reducers: {
	toggleSetKeyword: (state, action) => {
	  state.keyword = action.payload || "";
	  state.listStationPorts = [];
	},
  },
  extraReducers: (builder) => {
	builder
	.addCase(getListPortsTypeAsync.fulfilled, (state, action) => {
	  const responseData = action.payload;
	  const { keyword } = state;
	
	  if (Array.isArray(responseData)) {
		state.listStationPorts = responseData.filter((stationPorts: { name: string }) => 
		  stationPorts.name.toLowerCase().includes(keyword.toLowerCase())
		);
	  } else {
		state.listStationPorts = [responseData];
	  }
	})
	
	.addCase(createPortsTypeAsync.fulfilled, (state, action)=>{
			state.listStationPorts = [...state.listStationPorts, action.payload]
		})

	.addCase(updatePortsTypeAsync.fulfilled, (state, action) => {
	  const updatedStationPorts = action.payload;
	  const index = state.listStationPorts.findIndex((stationPort:any) => stationPort.id === updatedStationPorts.id);
	
	  if (index !== -1) {
		  state.listStationPorts[index] = updatedStationPorts;
	  }
	});
	
  },
});

export const { toggleSetKeyword } = stationPortsSlice.actions;
export default stationPortsSlice.reducer;
