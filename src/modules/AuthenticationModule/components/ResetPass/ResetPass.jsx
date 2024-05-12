import React, { useContext, useState } from "react";
import style from "../Auth.module.css";
import Images from "../../../ImagesMoudel/components/Images/Images";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

export default function ResetPass() {
  const {btnLoading}=useContext(AuthContext)
  const navigate = useNavigate();
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
  };

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
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <section className={`${style.authContainer}`}>
        <div className={`container-fluid ${style.layer} vh-100 text-center `}>
          <div className="row gx-1 h-100 justify-content-center align-items-center">
            <div className="col-md-6">
              <div className={`${style.auth} bg-body rounded-3 p-5`}>
                <div className={`${style.authHead} pt-4`}>
                  <img src={Images.authImg} alt="" />
                </div>
                <div className={`${style.authBody} text-start px-3 py-3`}>
                  <h3>Reset Password</h3>
                  <p>Please Enter Your Otp or Check Your Inbox</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={`form px-3 pb-4`}>

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
                          pattern: {
                            value: /^[A-Z0-9._%%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address.",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-start text-danger ps-2">
                        {errors.email.message}
                      </p>
                    )}

                    <div className={`${style.formGroup} otp pt-3`}>
                      <span
                        className={`${
                          errors.seed && "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        className={`${style.formField}  ${
                          errors.seed && "border-danger "
                        }`}
                        type="text"
                        placeholder="OTP"
                        {...register("seed", {
                          required: "OTP is Required",
                          pattern: {
                            value: /^[A-Z0-9a-z]{4}$/,
                            message: "OTP is Invalid.",
                          },
                          maxLength: {
                            value: 4,
                            message: "Maximum length exceeded 4",
                          },
                        })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="seed"
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
                    
                    <div className={`${style.formGroup} password pt-3`}>
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
                        placeholder="New Password"
                        autoComplete="off"
                        {...register("password", {
                          required: "Password is required",
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
                      name="password"
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
                    <div className={`${style.formGroup} confirmPassword pt-3`}>
                      <span
                        className={`${
                          errors.confirmPassword &&
                          "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        className={`${style.formField} ${
                          errors.confirmPassword && "border-danger "
                        }`}
                        type={hidePassInInpt ? "password" : "text"}
                        placeholder="Confirm New Password"
                        autoComplete="off"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) =>
                            value === watch("password") ||
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
                      name="confirmPassword"
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
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
