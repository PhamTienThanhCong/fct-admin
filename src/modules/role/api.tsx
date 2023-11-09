import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/sendRequest";
import { RolePayload } from "../../types/roles";

export const getRole = createAsyncThunk<RolePayload[], any>("role/getRole", async (payload, thunkApi) => {
    const res = await sendRequest('/role', {
        thunkApi,
        method: "GET",
    });
    return res;
});

// crud
export const createRole = createAsyncThunk<RolePayload, RolePayload>("role/createRole", async (payload, thunkApi) => {
    const res = await sendRequest('/role', {
        thunkApi,
        method: "POST",
        payload: payload
    });
    return res;
});

export const updateRole = createAsyncThunk<RolePayload, RolePayload>("role/updateRole", async (payload, thunkApi) => {
    const res = await sendRequest(`/role/${payload.id}`, {
        thunkApi,
        method: "PUT",
        payload: payload
    });
    return res;
});