import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = () => ({})
export const vehicleSlice = createSlice({
	name: 'vehicle',
	initialState: initialState(),
	reducers:{

	},
	extraReducers:(builder)=>{}
})
export default vehicleSlice.reducer