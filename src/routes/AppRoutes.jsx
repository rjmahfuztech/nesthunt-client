import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AdvertisementDetail from "../pages/AdvertisementDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import ResetPassword from "../components/Authentication/ResetPassword";
import ResetPasswordConfirm from "../components/Authentication/ResetPasswordConfirm";
import AccountActivate from "../components/Authentication/AccountActivate";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../components/Dashboard/Profile/Profile";
import UpdateProfile from "../components/Dashboard/Profile/UpdateProfile";
import ChangePassword from "../components/Dashboard/Profile/ChangePassword";
import Categories from "../pages/Categories";
import AddCategory from "../components/Category/AddCategory";
import RentRequests from "../pages/RentRequests";
import Favorites from "../pages/Favorites";
import Rentals from "../pages/Rentals";
import MyAdvertisements from "../pages/MyAdvertisements";
import AddAdvertisement from "../components/MyAdvertisements/AddAdvertisement";
import Advertisements from "../pages/Advertisements";
import Users from "../pages/Users";
import AdminRoute from "./AdminRoute";
import Orders from "../pages/Orders";

const AppRoutes = () => {
  return (
    <>
      {/* Public routes  */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="rentals" element={<Rentals />} />
          <Route
            path="rentals/:advertiseId"
            element={<AdvertisementDetail />}
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
          <Route
            index
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route
            path="categories"
            element={
              <AdminRoute>
                <Categories />
              </AdminRoute>
            }
          />
          <Route
            path="category/add"
            element={
              <AdminRoute>
                <AddCategory />
              </AdminRoute>
            }
          />
          <Route
            path="advertisements"
            element={
              <AdminRoute>
                <Advertisements />
              </AdminRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route path="my-advertisements" element={<MyAdvertisements />} />
          <Route path="advertisement/add" element={<AddAdvertisement />} />
          <Route path="rent-requests" element={<RentRequests />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
