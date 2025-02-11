import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setCurrentUser } from "../redux/slices/authSlice";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const dispatch = useDispatch();
  const isAuthenticated = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.id && user?.email) {
    dispatch(setCurrentUser(user));
  } else {
    console.error("No valid user found in localStorage");
  }

  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
