import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function PublicRoute({ children }) {
  const { loginData } = useContext(AuthContext);
  if (loginData?.userGroup == "SystemUser") return children;
  else return <Navigate to="/dashboard" />;
}
