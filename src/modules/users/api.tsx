import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/sendRequest";
import { IUser, UserPayload } from "../../types/users";

export const getUser = createAsyncThunk<IUser[], any>("user/getUser", async (payload, thunkApi) => {
    const res = await sendRequest('/user', {
        thunkApi,
        method: "GET",
    });
    return res;
});

// crud
export const createUser = createAsyncThunk<IUser, UserPayload>("user/createUser", async (payload, thunkApi) => {
    const res = await sendRequest('/user', {
        thunkApi,
        method: "POST",
        payload: payload
    });
    return res;
});

export const updateUser = createAsyncThunk<IUser, UserPayload>("user/updateUser", async (payload, thunkApi) => {
    const res = await sendRequest(`/user/${payload.id}`, {
        thunkApi,
        method: "PUT",
        payload: payload
    });
    return res;
});

export const deleteUser = createAsyncThunk<IUser, UserPayload>("user/deleteUser", async (payload, thunkApi) => {
    const res = await sendRequest(`/user/${payload.id}`, {
        thunkApi,
        method: "DELETE",
    });
    return res;
});