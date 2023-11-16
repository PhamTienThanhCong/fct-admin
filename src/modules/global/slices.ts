import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loadingStatus: false,
	messageText: "",
	severity: "success",
};
export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggleLoadingStatus: (state) => {
			state.loadingStatus = !state.loadingStatus;
		},
		setLoadingStatus: (state, action) => {
			state.loadingStatus = action.payload;
		},
		setMessageText: (state, action) => {
			state.messageText = action.payload;
		},
		setSeverity: (state, action) => {
			state.severity = action.payload;
		},
	},
});

export const { toggleLoadingStatus, setMessageText, setSeverity, setLoadingStatus } = globalSlice.actions;

export default globalSlice.reducer