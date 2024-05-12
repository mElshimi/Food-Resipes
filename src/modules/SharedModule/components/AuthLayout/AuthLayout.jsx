import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navgate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navgate("/dashboard");
    } else {
      navgate("/login");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

