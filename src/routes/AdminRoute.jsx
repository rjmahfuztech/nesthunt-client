import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="loader"></div>
      </div>
    );

  if (!user.is_staff) return <Navigate to="/dashboard/profile" replace />;

  return children;
};

export default AdminRoute;
