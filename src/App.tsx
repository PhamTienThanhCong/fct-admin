import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./modules/auth/Login";
import "./App.scss";
import AdminRoute from "./middlewares/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserContainer from "./modules/users/UserContainer";
import './assets/App.css'
import DashBroad from "./modules/dashBroad/DashBroad";
import Notification from "./modules/notification/Notification";
import Role from "./modules/role/Role";
import MyAccount from "./modules/account/MyAccount";
import VehicleManage from "./modules/vehicleManage/VehicleManage";
import CarType from "./modules/carType/CarType";
import AccessForbidden from "./modules/auth/AccessForbidden";
import ListCustomer from "./modules/customer/ListCustomer";
import ListStation from "./modules/station/ListStation";
import CustomerContainer from "./modules/customer/CustomerContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<DashBroad/>} />
              <Route path="/listUser/User" element={<UserContainer />} />
              <Route path="/notification" element={<Notification/>} />
              <Route path="/myAccount" element={<MyAccount/>} />
              <Route path="/listUser/role" element={<Role/>} />
              <Route path="/listUser/customer" element={<CustomerContainer />} />
              <Route path="/rescue_service" element={<VehicleManage/>} />
              <Route path="/car_type" element={<CarType/>} />
              <Route path="/list_station" element={<ListStation/>} />
            </Route>
          </Route>
          <Route path="/access-forbidden" element={<AccessForbidden/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
