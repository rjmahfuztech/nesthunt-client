import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Advertisements from "../pages/Advertisements";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="advertisement/:advertiseId"
            element={<Advertisements />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
