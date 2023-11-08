import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices";
import { createCarType, deleteCarType, getCarType, updateCarType } from "./api";

export interface UserRecord {
  id: string;
  name: string;
  country: string;
  description: string;
}

interface CarTypeState {
  listCarType: {
    data: UserRecord[];
    total_count: number;
  };
  keyword: string
}

const initialState: CarTypeState = {
  listCarType: {
    data: [],
    total_count: 0,
  },
  keyword: ''
};

export const getListCarTypeAsync = createAsyncThunk<any, any>(
  'car/getCarType', 
  async (payload: any, thunkAPI:any) => {
    try {
      thunkAPI.dispatch(toggleLoadingStatus());
      const { keyword } = thunkAPI.getState().carType
      const params = keyword ? { keyword: encodeURIComponent(keyword) } : {};
      const response = await getCarType({
        ...payload,
        ...params
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
    } finally {
      thunkAPI.dispatch(toggleLoadingStatus());
    }
  }
);


export const createCarTypeAsync = createAsyncThunk<any, any>('user/create', async (payload: any, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleLoadingStatus())
    const response = await createCarType(payload)
    thunkAPI.dispatch(toggleLoadingStatus())
    return response
  } catch (err) {
    console.log(err)
  }
})

export const updateCarTypeAsync = createAsyncThunk<any, any>('user/update', async (payload: any, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleLoadingStatus())
    const response = await updateCarType(payload)
    thunkAPI.dispatch(toggleLoadingStatus())
    return response
  } catch (err) {
    console.log(err)
  }
})

export const deleteCarTypeAsync = createAsyncThunk<any, any>('user/delete', async (id: any, thunkAPI) => {
  try {
    thunkAPI.dispatch(toggleLoadingStatus())
    const response = await deleteCarType(id)
    thunkAPI.dispatch(toggleLoadingStatus())
    return response
  } catch (err) {
    console.log(err)
  }
})



export const carTypeSlice = createSlice({
  name: "carType",
  initialState,
  reducers: {
    toggleSetKeyword: (state, action) => {
      state.keyword = action.payload || '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListCarTypeAsync.fulfilled, (state, action) => {
      state.listCarType.data = action.payload;
      state.listCarType.total_count = action.payload.length;
    });
  },
});
export const {toggleSetKeyword } = carTypeSlice.actions
export default carTypeSlice.reducer;
