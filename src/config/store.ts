import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/slices';
import carTypeReducer from '../modules/carType/slices'
import vehicleReducer from '../modules/vehicleManage/slices'
import roleReducer from '../modules/role/slices'
import userReducer from '../modules/users/slices'
import customerReducer from '../modules/customer/slices'

export const store = configureStore({
    reducer:{
      auth: authReducer,
      carType: carTypeReducer, 
      vehicle : vehicleReducer,
      role: roleReducer,
      user: userReducer,
      customer: customerReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store