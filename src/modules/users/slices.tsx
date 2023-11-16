import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getUser, updateUser } from "./api";
import { UserSliceState } from "../../types/users";

const initialState: UserSliceState = {
	users: [],
	isFetching: false,
};

export const UserSlice = createSlice({
	name: "role",
	initialState,
	reducers: {
		_deleteUser: (state, action) => {
			state.users = state.users.filter((User) => User.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.isFetching = true;
			state.users = action.payload;
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			state.users = [...state.users, action.payload];
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.users = state.users.map((User) => {
				if (User.id === action.payload.id) {
					return action.payload;
				}
				return User;
			});
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {});
	},
});

export const { _deleteUser } = UserSlice.actions;
export default UserSlice.reducer;
