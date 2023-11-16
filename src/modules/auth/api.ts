import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLogin } from '../../types/users';
import { sendRequest } from '../../utils/sendRequest';

export const loginRequest = createAsyncThunk<any, UserLogin>("auth/login", async (payload, thunkApi) => {
    const res = await sendRequest('/user/login', {
        payload: payload,
        thunkApi,
        method: "POST",
    });
    return res;
});

export const getDataUser = createAsyncThunk<any, void>("auth/getDataUser", async (payload, thunkApi) => {
    const res = await sendRequest('/user/get_user', {
        thunkApi,
        method: "GET",
    });
    return res;
});
