import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/slices';
import carTypeReducer from '../modules/carType/slices'
import vehicleReducer from '../modules/vehicleManage/slices'
import roleReducer from '../modules/role/slices'
import userReducer from '../modules/users/slices'
import customerReducer from '../modules/customer/slices'
import stationReducer from '../modules/station/slices'
import orderReducer from '../modules/order/slice'
import chatReducer from '../modules/chats/slice'
import commentReducer from '../modules/comment/slice'

export const store = configureStore({
    reducer:{
      comment:commentReducer,
      chat:chatReducer,
      order:orderReducer,
      auth: authReducer,
      carType: carTypeReducer, 
      vehicle : vehicleReducer,
      role: roleReducer,
      user: userReducer,
      customer: customerReducer,
      station : stationReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store