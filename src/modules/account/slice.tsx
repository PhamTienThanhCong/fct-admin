import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { toggleLoadingStatus } from "../global/slices";
import { updateAccount } from "./api";

export interface IUser {
  id: number;
  role_id: string | null | number;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  card_id: string | null;
  title: string | null;
  description: string | null
}


export const updateCarTypeAsync = createAsyncThunk<any, { id: string, params: any }>(
	'carType/update',
	async ({ id, params }, thunkAPI: any) => {
	  try {
		thunkAPI.dispatch(toggleLoadingStatus());
		const response = await updateAccount(id, params);
		thunkAPI.dispatch(toggleLoadingStatus());
		return response.data;
	  } catch (error) {
		console.log(error);
		throw error;
	  }
	}
);


