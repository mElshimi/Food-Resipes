import React from "react";
import style from "../Auth.module.css";
import Images from "../../../ImagesMoudel/components/Images/Images";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      toast.success(response.data.message);
      navigate("/resetpass");
    } catch (err) {
      toast.error(err.response.data.message);
    }
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
                  <h3>Forgot Your Password?</h3>
                  <p>
                    No worries! Please enter your email and we will send a
                    password reset link
                  </p>
                </div>

                <div className="form px-3 pb-4">
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
                        className={`${style.formField} ${
                          errors.email && "border-danger "
                        } `}
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

                    <div className={`links d-flex justify-content-end pt-2`}>
                      <Link
                        to={"/login"}
                        className={`${style.btnLinks} ${style.btnColor} `}
                      >
                        Login Now?
                      </Link>
                    </div>

                    <button className={`btn w-100 mt-3 ${style.btnSubmit}`}>
                      Submit
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
