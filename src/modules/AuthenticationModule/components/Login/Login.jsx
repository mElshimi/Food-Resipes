import React, { useContext, useState } from "react";
import style from "../Auth.module.css";
import Images from "../../../ImagesMoudel/components/Images/Images";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

export default function Login() {
  const { baseUrl, btnloading, saveLoginData } =
    useContext(AuthContext);
  let [hidePassInInpt, setHidePassInInpt] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/Users/Login`, data);
      // location.reload();
      toast.success("Logged in successfully");
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
  };

  const changePassInputType = () => {
    setHidePassInInpt((hidePassInInpt = !hidePassInInpt ? true : false));
    hidePassInInpt
      ? document
          .getElementById("eyeToggel")
          .setAttribute("data-styling", "eyeOff")
      : document
          .getElementById("eyeToggel")
          .setAttribute("data-styling", "eyeOn");
  };

  return (
    <>
      <section className={`${style.authContainer} `}>
        <div className={`container-fluid ${style.layer} vh-100 text-center `}>
          <div className="row gx-1 h-100 justify-content-center align-items-center">
            <div className="col-md-6 ">
              <div className={`${style.auth} bg-body rounded-3 p-5`}>
                <div className={`${style.authHead} pt-4`}>
                  <img src={Images.authImg} alt="" />
                </div>
                <div className={`${style.authBody} text-start px-3 py-3`}>
                  <h3>Log In</h3>
                  <p>Welcome Back! Please enter your details</p>
                </div>

                <div className={`form px-3 pb-4`}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${style.formGroup}`}>
                      <span
                        className={`${
                          errors.email && "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-at"></i>
                      </span>
                      <input
                        className={`${style.formField}   ${
                          errors.email && "border-danger "
                        }`}
                        type="text"
                        placeholder="Enter your E-mail"
                        {...register("email", {
                          required: "Email is Required",
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-start text-danger ps-2">
                        {errors.email.message}
                      </p>
                    )}

                    <div className={`${style.formGroup} pt-3`}>
                      <span
                        className={`${
                          errors.password &&
                          "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        className={`${style.formField} ${
                          errors.password && "border-danger "
                        }`}
                        type={hidePassInInpt ? "password" : "text"}
                        placeholder="Password"
                        autoComplete="off"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      <a
                        data-styling="eyeOff"
                        id="eyeToggel"
                        onClick={changePassInputType}
                      >
                        <i
                          className={`fa-solid  ${
                            hidePassInInpt ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </a>
                    </div>
                    {errors.password && (
                      <p className="text-start text-danger ps-2">
                        {errors.password.message}
                      </p>
                    )}

                    <div
                      className={`links d-flex justify-content-between pt-2`}
                    >
                      <Link to={"/register"} className={`${style.btnLinks}`}>
                        Resister Now?
                      </Link>
                      <Link
                        to={"/forgetpass"}
                        className={`${style.btnLinks} ${style.btnColor} `}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <button className={`btn w-100 mt-3 ${style.btnSubmit}`}>
                      {isLoading ? btnloading() : "Login"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
