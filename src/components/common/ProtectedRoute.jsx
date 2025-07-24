import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, bizOnly = false, adminOnly = false }) => {
  const { user, isLoggedIn, isAdmin, isBusiness } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (bizOnly && !isBusiness && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
