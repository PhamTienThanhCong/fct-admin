import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices";
import { createCarType, deleteCarType, getCarType, updateCarType } from "./api";
import { CarTypeState } from "../../types/carType/carType";


export const getListCarTypeAsync = createAsyncThunk<any, any>(
  "car/getCarType",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const { keyword } = thunkAPI.getState().carType;
      const params = keyword ? { keyword: encodeURIComponent(keyword) } : {};
      const response = await getCarType({ ...payload, ...params });
      return response.data;
    } catch (error) {
      console.error("Error in getListCarTypeAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);

export const createCarTypeAsync = createAsyncThunk<any, any>(
  "carType/create",
  async (payload: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await createCarType(payload);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response.data;
    } catch (error) {
      console.error("Error in createCarTypeAsync:", error);
      throw error;
    }
  }
);


export const updateCarTypeAsync = createAsyncThunk<any, { id: string, params: any }>(
  'carType/update',
  async ({ id, params }, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await updateCarType(id, params);
      thunkAPI.dispatch(toggleLoadingStatus());
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


export const deleteCarTypeAsync = createAsyncThunk<any, any>(
  "carType/delete",
  async (id: any, thunkAPI: any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const response = await deleteCarType(id);
      return response
    } catch (error) {
      console.error("Error in deleteCarTypeAsync:", error);
      throw error;
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);

const initialState: CarTypeState = {
  listCarType:[],
  keyword:''
};

export const carTypeSlice = createSlice({
  name: "carType",
  initialState,
  reducers: {
    toggleSetKeyword: (state, action) => {
      state.keyword = action.payload || "";
      state.listCarType = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getListCarTypeAsync.fulfilled, (state, action) => {
      const responseData = action.payload;
      const { keyword } = state;
    
      if (Array.isArray(responseData)) {
        state.listCarType = responseData.filter((carType: { name: string }) => 
          carType.name.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        state.listCarType = [responseData];
      }
    })
    
    .addCase(createCarTypeAsync.fulfilled, (state, action)=>{
			state.listCarType = [...state.listCarType, action.payload]
		})

    .addCase(updateCarTypeAsync.fulfilled, (state, action) => {
      const updatedCarType = action.payload;
      const index = state.listCarType.findIndex((carType) => carType.id === updatedCarType.id);
    
      if (index !== -1) {
        state.listCarType[index] = updatedCarType;
      }
    });
    
  },
});

export const { toggleSetKeyword } = carTypeSlice.actions;
export default carTypeSlice.reducer;
