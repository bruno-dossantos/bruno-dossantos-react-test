import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../services/authService";

function ProtectedRoutes() {
  const session = getSession();
  const isAuthenticated = !!session;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
