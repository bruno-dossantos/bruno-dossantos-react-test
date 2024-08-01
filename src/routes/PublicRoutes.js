import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/login";
import NotFound from "../components/404/NotFound";
import { getSession } from "../services/authService";

function PublicRoutes() {
  const session = getSession();
  const isAuthenticated = !!session;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/products" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/404" /> : <Login />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PublicRoutes;
