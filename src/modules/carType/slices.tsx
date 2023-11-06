import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = () => ({})
export const carTypeSlice = createSlice({
    name: 'carType',
    initialState: initialState(),
    reducers:{

    },
    extraReducers:(builder)=>{}
})
export default carTypeSlice.reducer