import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Advertisements from "../pages/Advertisements";

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
      </Routes>
    </>
  );
};

export default AppRoutes;
