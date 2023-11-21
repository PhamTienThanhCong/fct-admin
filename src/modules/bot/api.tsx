import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/sendRequest";

// crud
export const getBotData = createAsyncThunk<any, any>(
	"bot/getData",
	async (payload, thunkApi) => {
		const res = await sendRequest("/bot", {
			thunkApi,
			method: "GET",
		});
		return res;
	}
);

export const crawBotData = createAsyncThunk<any, any>(
    "bot/crawData",
    async (payload, thunkApi) => {
        const res = await sendRequest("/bot/craw", {
            thunkApi,
            method: "POST",
            payload: payload,
        });
        return res;
    }
);

// training
export const trainBotData = createAsyncThunk<any, any>(
    "bot/trainData",
    async (payload, thunkApi) => {
        const res = await sendRequest("/bot/training", {
            thunkApi,
            method: "POST",
            payload: payload,
        });
        return res;
    }
);