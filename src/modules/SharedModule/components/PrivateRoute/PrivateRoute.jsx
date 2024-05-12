import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import PropTypes from 'prop-types'
export default function PrivateRoute({ children }) {
  const { loginData } = useContext(AuthContext);
  if (loginData?.userGroup == "SuperAdmin") return children;
  else return <Navigate to="/dashboard" />;
}
