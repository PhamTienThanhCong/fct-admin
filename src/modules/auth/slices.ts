import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/users";
import { getDataUser, loginRequest } from "./api";

const CURRENT_USER = {
  id: 0,
  email: "",
  full_name: "",
  role_id: null,
  phone: "",
  address: "",
  card_id: "",
  title: "",
  description: "",
}

const initialState: AuthState = {
    isAuthenticated: false,
    isFetching: true,
    currentUser: CURRENT_USER,
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = CURRENT_USER;
      // remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("token");
    },
    toggleLogout: (state) => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.isFetching = false;
        localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginRequest.pending, (state) => {
        state.isFetching = true;
    });
    builder.addCase(getDataUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.isFetching = false;
        state.currentUser = action.payload;
    });
    builder.addCase(getDataUser.rejected, (state) => {
        state.isFetching = false;
        logout();
    });
  },
});

export const { logout,toggleLogout } = authSlice.actions;
export default authSlice.reducer;
