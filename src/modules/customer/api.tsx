import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/sendRequest";
import { CustomerPayload, ICustomer } from "../../types/customer";

export const getCustomer = createAsyncThunk<ICustomer[], any>("Customer/getCustomer", async (payload, thunkApi) => {
    const res = await sendRequest('/customer', {
        thunkApi,
        method: "GET",
    });
    return res;
});

// crud
export const createCustomer = createAsyncThunk<ICustomer, CustomerPayload>("Customer/createCustomer", async (payload, thunkApi) => {
    const res = await sendRequest('/customer', {
        thunkApi,
        method: "POST",
        payload: payload
    });
    return res;
});
