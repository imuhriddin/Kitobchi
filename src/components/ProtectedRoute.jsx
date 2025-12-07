import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("user"); // user login bo'lganda saqlanadi

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
