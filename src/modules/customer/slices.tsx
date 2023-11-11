import { createSlice } from "@reduxjs/toolkit";
import { CustomerSliceState } from "../../types/customer";
import { createCustomer, getCustomer } from "./api";

const initialState: CustomerSliceState = {
    customers: [],
    isFetching: false,
};

export const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(getCustomer.fulfilled, (state, action) => {
            state.isFetching = true;
            state.customers = action.payload;
        });
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.customers = [...state.customers, action.payload];
        });
    },
});

export default CustomerSlice.reducer;
