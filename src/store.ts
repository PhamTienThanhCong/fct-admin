import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import globalReducer from "./features/global/slices";

const store = configureStore({
  reducer: {
    // global: globalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
