import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "../../../AuthenticationModule/components/Auth.module.css";
import Images from "../../../ImagesMoudel/components/Images/Images";
import "./sidBar.css";
import { AuthContext } from "../../../../context/AuthContext";

export default function SideBar() {

  const { loginData } = useContext(AuthContext);
  // states
  // for collopse sidbar
  const [isCollapse, setIsCollapse] = useState(false);
  // for window wideth
  const [windowWidth, setWindowWidth] = useState(0);
  // for icon toggel sidbar
  const [hideIconToggel, setHideIconToggle] = useState("");
  // for breakpoint sidbbar
  let [breakPoint, setBreakpoint] = useState("no");
  // navigate for  go to other component
  const navigate = useNavigate();
  // console.log(loginData);
  // The change function is to collapse the value true to false or reverse
  const toggelCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  // faunction for log out user and clear local storage
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
    
  };

  // function for get window width value
  const getSize = () => {
    setWindowWidth(window.innerWidth);
  };
  // function for set breakpoint value
  const BreakPoint = () => {
    setBreakpoint(
      breakPoint == "sm" ? (breakPoint = "no") : (breakPoint = "sm")
    );
  };
  // save  the boolean to handle  showing and hiding the add and edit modal
  const [show, setShow] = useState(false);

  // function for handling hiding the add and edit modal
  const handleClose = () => setShow(false);

  // function for handling showing the add and edit modal
  const handleShow = () => setShow(true);
  // add event listener when component mountd
  useEffect(() => {
    // event to check window width size when  resize
    window.addEventListener("resize", getSize);
    // conditional statement for checking window width is it smaller than 992px
    if (windowWidth < 992 && window.innerWidth < 992) {
      // if it is true then set the sidebar collapse to true
      setIsCollapse(true);
    } else {
      // if it is false then set the sidebar collapse to false
      setIsCollapse(false);
    }
    // conditional statement for checking window width is it smaller than 576px
    if (windowWidth < 576 && window.innerWidth < 576) {
      // if it is true then set the icon toggle sidebar visible
      setHideIconToggle("");
      //and set the sidebar toggle
      setBreakpoint("sm");
    } else {
      // if it is false then set the icon toggel sidebar invisible
      setHideIconToggle("hideImgToggel");
      // and set the sidebar collapse
      setBreakpoint("no");
    }
    return () => {
      // remove event listener when component ummountd
      window.removeEventListener("resize", getSize);
    };
  }, [window.innerWidth]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(response.data.message);
      logOut();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  let [hidePassInInpt, setHidePassInInpt] = useState(true);

  const changePassInputType = () => {
    setHidePassInInpt((hidePassInInpt = !hidePassInInpt ? true : false));
    hidePassInInpt
      ? document
          .getElementById("eyeToggel1")
          .setAttribute("data-styling", "eyeOff")
      : document
          .getElementById("eyeToggel1")
          .setAttribute("data-styling", "eyeOn");
    hidePassInInpt
      ? document
          .getElementById("eyeToggel2")
          .setAttribute("data-styling", "eyeOff")
      : document
          .getElementById("eyeToggel2")
          .setAttribute("data-styling", "eyeOn");
    hidePassInInpt
      ? document
          .getElementById("eyeToggel3")
          .setAttribute("data-styling", "eyeOff")
      : document
          .getElementById("eyeToggel3")
          .setAttribute("data-styling", "eyeOn");
  };
  return (
    <>
      <section className="d-flex ">
        {/* modal handle add and  update */}
        <Modal className="changePassModal" show={show} onHide={handleClose}>
          <Modal.Body className=" text-center ">
            <div className={`${style.auth} bg-body rounded-3 px-2 py-3`}>
              <div className={`${style.authHead} `}>
                <img src={Images.authImg} alt="" />
              </div>
              <div className={`${style.authBody} text-start px-3 py-3`}>
                <h3>Change Your Password</h3>
                <p>Enter your details below</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`form px-2 pb-1`}>
                  {/* old pass */}
                  <div className={`${style.formGroup} password `}>
                    <span
                      className={`${
                        errors.oldPassword &&
                        "bg-danger text-white border-danger"
                      }`}
                    >
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className={`${style.formField} ${
                        errors.oldPassword && "border-danger "
                      }`}
                      type={hidePassInInpt ? "password" : "text"}
                      placeholder="Old Password"
                      autoComplete="off"
                      {...register("oldPassword", {
                        required: "Old password is required",
                      })}
                    />
                    <a
                      data-styling="eyeOff"
                      id="eyeToggel3"
                      onClick={changePassInputType}
                    >
                      <i
                        className={`fa-solid  ${
                          hidePassInInpt ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </a>
                  </div>
                  {errors.oldPassword && (
                    <p className="text-start text-danger ps-2">
                      {errors.oldPassword.message}
                    </p>
                  )}
                  {/* new Pass */}
                  <div className={`${style.formGroup} password pt-3`}>
                    <span
                      className={`${
                        errors.newPassword &&
                        "bg-danger text-white border-danger"
                      }`}
                    >
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className={`${style.formField} ${
                        errors.newPassword && "border-danger "
                      }`}
                      type={hidePassInInpt ? "password" : "text"}
                      placeholder="New Password"
                      autoComplete="off"
                      {...register("newPassword", {
                        required: "New Password is required",
                        pattern: {
                          value:
                            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                          message:
                            "Password must contain at least one digit, lowercase letter, uppercase letter, special character",
                        },
                        minLength: {
                          value: 8,
                          message: "Minimum length should be 8 characters",
                        },
                        maxLength: {
                          value: 16,
                          message: "Maximum length exceeded 16",
                        },
                      })}
                    />
                    <a
                      data-styling="eyeOff"
                      id="eyeToggel1"
                      onClick={changePassInputType}
                    >
                      <i
                        className={`fa-solid  ${
                          hidePassInInpt ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </a>
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="newPassword"
                    render={({ messages }) => {
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p
                              className="text-start text-danger ps-2"
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                  {/* confirm pass */}
                  <div className={`${style.formGroup} confirmPassword pt-3`}>
                    <span
                      className={`${
                        errors.confirmNewPassword &&
                        "bg-danger text-white border-danger"
                      }`}
                    >
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className={`${style.formField} ${
                        errors.confirmNewPassword && "border-danger "
                      }`}
                      type={hidePassInInpt ? "password" : "text"}
                      placeholder="Confirm New Password"
                      autoComplete="off"
                      {...register("confirmNewPassword", {
                        required: "Confirm New Password is required",
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "Confirm Password do not match",
                      })}
                    />
                    <a
                      data-styling="eyeOff"
                      id="eyeToggel2"
                      onClick={changePassInputType}
                    >
                      <i
                        className={`fa-solid  ${
                          hidePassInInpt ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </a>
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="confirmNewPassword"
                    render={({ messages }) => {
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p
                              className="text-start text-danger ps-2"
                              key={type}
                            >
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                  <button className={`btn w-100 mt-3 ${style.btnSubmit}`}>
                    Change Password
                  </button>
                </div>
              </form>
            </div>
            <p role="button" onClick={handleClose}>
              Cancel?
            </p>
          </Modal.Body>
        </Modal>

        <div className={`sidBar`}>
          <Sidebar
            
            breakPoint={breakPoint}
            
            collapsedWidth="65px"
            collapsed={isCollapse}
          >
            <Menu className="">
              <MenuItem
                className="pb-5 pt-3 headerSidbar"
                onClick={window.innerWidth < 576 ? BreakPoint : toggelCollapse}
                icon={<img className="sidBarImg " src={Images.sidImg} />}
              ></MenuItem>
              <MenuItem
                active={location.hash === "#/dashboard" ? true : false}
                icon={<i className="fa fa-home" aria-hidden="true"></i>}
                component={<Link to="/dashboard" />}
              >
                Home
              </MenuItem>
              {loginData?.userGroup === "SuperAdmin" ? (
                <MenuItem
                  active={
                    location.hash === "#/dashboard/users" ? true : false
                  }
                  icon={<i className="fa fa-users" aria-hidden="true"></i>}
                  component={<Link to="/dashboard/users" />}
                >
                  Users
                </MenuItem>
              ) : (
                ""
              )}
              {loginData?.userGroup === "SuperAdmin" ? (
                <MenuItem
                  active={
                    location.hash === "#/dashboard/categories"
                      ? true
                      : false
                  }
                  icon={<i className="fa fa-table-list" aria-hidden="true"></i>}
                  component={<Link to="/dashboard/categories" />}
                >
                  Categories
                </MenuItem>
              ) : (
                ""
              )}
              <MenuItem
                active={
                  location.hash === "#/dashboard/recipes" ? true : false
                }
                icon={<i className="fa fa-bowl-rice" aria-hidden="true"></i>}
                component={<Link to="/dashboard/recipes" />}
              >
                Recipes
              </MenuItem>
              {loginData?.userGroup == "SystemUser" ? (
                <MenuItem
                  active={
                    location.hash === "#/dashboard/favs" ? true : false
                  }
                  icon={
                    <i className="fa-regular fa-heart" aria-hidden="true"></i>
                  }
                  component={<Link to="/dashboard/favs" />}
                >
                  Favorites
                </MenuItem>
              ) : (
                ""
              )}
              <MenuItem
                onClick={handleShow}
                icon={
                  <i
                    className="fa-solid fa-unlock-keyhole"
                    aria-hidden="true"
                  ></i>
                }
              >
                <span className="changePass">Change Password</span>
              </MenuItem>
              <MenuItem
                className="mt-5"
                onClick={logOut}
                icon={
                  <i
                    className="fa fa-right-from-bracket"
                    aria-hidden="true"
                  ></i>
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
        <div className={`imgToggel  ${hideIconToggel}`} onClick={BreakPoint}>
          <img src={Images.sidImg} />
        </div>
      </section>
    </>
  );
}
