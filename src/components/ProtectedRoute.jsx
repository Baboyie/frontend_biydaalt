import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isAdmin, adminOnly }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" />; // Redirect to home if not an admin
  }

  return <Outlet />; // Allow access to the route
};

export default ProtectedRoute;