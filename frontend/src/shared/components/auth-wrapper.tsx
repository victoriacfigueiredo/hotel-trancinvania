import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { sessionManager } from "../config/session-manager";

interface AuthWrapperProps {
  children: React.ReactNode;
  allowedUserTypes: ("client" | "hotelier")[];
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  allowedUserTypes,
}) => {
  const location = useLocation();
  const isAuthenticated = sessionManager.isAuthenticated();
  const userType = sessionManager.getUserType();

  if (
    !isAuthenticated ||
    !allowedUserTypes.includes(userType as "client" | "hotelier")
  ) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
