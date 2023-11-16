import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{},
    extraReducers:(builder) => {}
})

export default chatSlice.reducer