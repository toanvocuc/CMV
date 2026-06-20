import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// allowedRoles: ["admin"] | ["writer"] | omit for any authenticated user
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuth, role } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/writer"} replace />;
  }
  return children;
};

export default ProtectedRoute;
