import { useAuth } from "@/contexts/UserContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
