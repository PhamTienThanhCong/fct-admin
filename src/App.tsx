import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./modules/auth/Login";
import "./App.scss";
import AdminRoute from "./middlewares/AdminRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AdminRoute />}>
            <Route path="/" element={"home"} />
            <Route path="/home" element={"home"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
