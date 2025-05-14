import useAuthContext from "../hooks/useAuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="loader"></div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  if (location.pathname === "/dashboard" && !user.is_staff)
    return <Navigate to="/dashboard/profile" replace />;

  return children;
};

export default PrivateRoutes;
