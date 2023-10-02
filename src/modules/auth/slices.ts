import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/users";
import { getDataUser, loginRequest } from "./api";

const initialState: AuthState = {
    isAuthenticated: false,
    isFetching: true,
    currentUser: {
      id: 0,
      email: "",
      username: "",
      role: null,
    },
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = {
        id: 0,
        email: "",
        username: "",
        role: null,
      };
      // remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.isFetching = false;
        state.currentUser = action.payload.user;
        // save token to localStorage
        localStorage.setItem("token", action.payload.user.token);
    });
    builder.addCase(loginRequest.pending, (state) => {
        state.isFetching = true;
    });
    builder.addCase(getDataUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.isFetching = false;
        state.currentUser = action.payload.user;
    });
    builder.addCase(getDataUser.rejected, (state) => {
        state.isFetching = false;
        logout();
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
