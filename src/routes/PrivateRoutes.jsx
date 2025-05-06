import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="loader"></div>
      </div>
    );

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
