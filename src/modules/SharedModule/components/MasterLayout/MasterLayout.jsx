import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { AuthContext } from "../../../../context/AuthContext";
export default function MasterLayout() {
  const [isloading, setIsLoading] = useState(false);
  const { getCurrentUser, loading } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="d-flex">
        <div className="">
          <SideBar />
        </div>
        {isloading ? (
          <div className="w-100 vh-100 d-flex  justify-content-center align-items-center  ">
            {loading()}
          </div>
        ) : (
          <div className="w-100 vh-100 overflow-y-auto ">
            <Navbar />
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
