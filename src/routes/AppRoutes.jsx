import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Advertisements from "../pages/Advertisements";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import ResetPassword from "../components/Authentication/ResetPassword";
import ResetPasswordConfirm from "../components/Authentication/ResetPasswordConfirm";
import AccountActivate from "../components/Authentication/AccountActivate";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <>
      {/* Public routes  */}
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
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route path="activate/:uid/:token" element={<AccountActivate />} />
        {/* Private routes */}
        <Route
          path="dashboard"
          element={
            <PrivateRoutes>
              <DashboardLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
