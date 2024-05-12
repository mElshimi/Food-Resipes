import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <>
      <section className={`navBar container-fluid mt-4  `}>
        <nav className={`nav-container `}>
          <div className={`row nav-row  justify-content-between `}>
            <div className={`col-md-6 `}>
              <div className={`search ps-3 `}>
                <div className={`group`}>
                  <i className="fa-solid fa-magnifying-glass icon"></i>
                  <input
                    className="input"
                    type="search"
                    placeholder="Search Here"
                  />
                </div>
              </div>
            </div>
            <div className={`col-md-6 `}>
              <div
                className={`userData d-flex justify-content-end  align-content-center  `}
              >
                <div className="img-user d-flex justify-content-center  align-items-center ">
                  {currUser?.imagePath ? (
                    <div>
                      <img
                        className="w-100"
                        src={`https://upskilling-egypt.com:3006/${currUser.imagePath}`}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="pt-1 bg-success user-char">
                      <h4>{currUser?.userName?.charAt(0).toUpperCase()}</h4>
                    </div>
                  )}
                </div>

                {/* <i className="fa-solid fa-angle-down me-5"></i> */}
                <p className={`user-name pe-4`}>{currUser?.userName}</p>
                {/* *********************************** */}
                <div className="dropdown">
                  <button
                    className="p-0 m-0 border-0  bg-body "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-angle-down me-5"></i>
                  </button>

                  <ul className="dropdown-menu">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/dashboard/profile");
                        }}
                        className="dropdown-item"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button onClick={logOut} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
                <div className={`position-relative `}></div>
              </div>
            </div>
          </div>
        </nav>
        <h2 className="clock text-black "></h2>
      </section>
    </>
  );
}
