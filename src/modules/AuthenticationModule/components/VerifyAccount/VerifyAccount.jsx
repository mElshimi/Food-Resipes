import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Images from "../../../ImagesMoudel/components/Images/Images";
import style from "../Auth.module.css";
import { AuthContext } from "../../../../context/AuthContext";

export default function VerifyAccount() {
  const { baseUrl, btnloading } = useContext(AuthContext);
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
      const response = await axios.put(`${baseUrl}/Users/verify`, data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
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
                  <h3>Verify Account</h3>
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
                          errors.code && "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-lock-open"></i>
                      </span>
                      <input
                        className={`${style.formField} ${
                          errors.code && "border-danger "
                        }`}
                        type="text"
                        placeholder="Verify Code"
                        autoComplete="off"
                        {...register("code", {
                          required: "Code is required",
                        })}
                      />
                    </div>
                    {errors.code && (
                      <p className="text-start text-danger ps-2">
                        {errors.code.message}
                      </p>
                    )}

                    <div
                      className={`links d-flex justify-content-between pt-2`}
                    >
                      <Link to={"/register"} className={`${style.btnLinks}`}>
                        Resister Now?
                      </Link>
                      <Link
                        to={"/login"}
                        className={`${style.btnLinks} ${style.btnColor} `}
                      >
                        Login Now?
                      </Link>
                    </div>
                    <button className={`btn w-100 mt-3 ${style.btnSubmit}`}>
                      {isLoading ? btnloading() : "Verify"}
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
