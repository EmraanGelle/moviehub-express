import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) return null; // or a spinner
  return authenticated ? children : <Navigate to="/login" replace />;
}
