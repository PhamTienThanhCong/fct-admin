import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/slices';
import carTypeReducer from '../modules/carType/slices'
import vehicleReducer from '../modules/vehicleManage/slices'

export const store = configureStore({
    reducer:{
      auth: authReducer,
      carType: carTypeReducer, 
      vehicle : vehicleReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store