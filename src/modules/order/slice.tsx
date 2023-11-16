import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices";
import { createOrder, getOrders } from "./api";
import { OrderState } from "../../types/order/order";

export const getListOrderAsync = createAsyncThunk<any, any>(
	"order/getOrder",
	async (payload: any, thunkAPI: any) => {
	  try {
		thunkAPI.dispatch(toggleLoadingStatus());
		const { keyword } = thunkAPI.getState().carType;
		const params = keyword ? { keyword: encodeURIComponent(keyword) } : {};
		const response = await getOrders({ ...payload, ...params });
		return response.data
	  } catch (error) {
		console.error("Error in getListCarTypeAsync:", error);
		throw error;
	  } finally {
		thunkAPI.dispatch(toggleLoadingStatus());
	  }
	}
);

export const createOrderAsync = createAsyncThunk<any, any>(
	"order/create",
	async (payload: any, thunkAPI: any) => {
	  try {
		thunkAPI.dispatch(toggleLoadingStatus());
		const response = await createOrder(payload);
		thunkAPI.dispatch(toggleLoadingStatus());
		return response
	  } catch (error) {
		console.error("Error in createCarTypeAsync:", error);
		throw error;
	  }
	}
);

const initialState: OrderState = {
  listOrder: [],
  keyword: ''
};

export const orderSlice = createSlice({
	name:'order',
	initialState,
	reducers:{
    toggleSetKeyword: (state, action) => {
      state.keyword = action.payload || "";
      state.listOrder = [];
    },
  },
	extraReducers:(builder) => {
    builder
    .addCase(getListOrderAsync.fulfilled,(state,action)=>{
      const resData = action.payload;
      const {keyword } = state;

      if(Array.isArray(resData)){
        state.listOrder = resData.filter((order :{name:string})=>
          order.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }else{
        state.listOrder = [resData]
      }
    })

    .addCase(createOrderAsync.fulfilled,(state,action)=>{
      state.listOrder = [...state.listOrder, action.payload]
    })
  }
})

export const {toggleSetKeyword } = orderSlice.actions
export default orderSlice.reducer