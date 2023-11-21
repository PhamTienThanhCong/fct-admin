import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/sendRequest";
import { ChatPayload, ChatResponse } from "../../types/chat/chat";

// crud
export const getChat = createAsyncThunk<ChatResponse, any>(
	"chat/getChat",
	async (payload, thunkApi) => {
		const res = await sendRequest("/chat", {
			thunkApi,
			method: "GET",
		});
		return res;
	}
);

export const createChat = createAsyncThunk<ChatPayload, ChatPayload>(
	"chat/createChat",
	async (payload, thunkApi) => {
		const res = await sendRequest("/chat", {
			thunkApi,
			method: "POST",
			payload: payload,
		});
		return res;
	}
);

export const updateChat = createAsyncThunk<ChatPayload, ChatPayload>(
	"chat/updateChat",
	async (payload, thunkApi) => {
		const res = await sendRequest(`/chat/${payload.tag}`, {
			thunkApi,
			method: "PUT",
			payload: payload,
		});
		return res;
	}
);

export const deleteChat = createAsyncThunk<any, ChatPayload>(
	"chat/deleteChat",
	async (payload, thunkApi) => {
		const res = await sendRequest(`/chat/${payload.tag}`, {
			thunkApi,
			method: "DELETE",
		});
		return res;
	}
);
