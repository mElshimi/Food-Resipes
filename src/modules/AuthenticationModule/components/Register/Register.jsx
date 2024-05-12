import React, { useContext, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Images from "../../../ImagesMoudel/components/Images/Images";
import style from "../Auth.module.css";
import { AuthContext } from "../../../../context/AuthContext";

export default function Register() {
  const { baseUrl, btnloading } = useContext(AuthContext);
  let [hidePassInInpt, setHidePassInInpt] = useState(true);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.post(
        `${baseUrl}/Users/Register`,
        registerFormData
      );
      toast.success(response.data.message);
      navigate("/verifyaccount");
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
  };
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("country", data.country);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };
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
  return (
    <>
      <section className={`${style.authContainer} `}>
        <div className={`${style.layer} vh-100 `}>
          <div
            className={`container h-100 d-flex justify-content-center align-items-center flex-column  `}
          >
            <div className=" bg-body  w-100 rounded-4 py-5 px-5 shadow-lg">
              <div className="w-100 text-center ">
                <div className={`${style.authHead} pt-4`}>
                  <img src={Images.authImg} alt="" />
                </div>
                <div className={`${style.authBody} text-start `}>
                  <h3>Register</h3>
                  <p>Welcome Back! Please enter your details</p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    {/************* userName  *******************/}
                    <div className={`${style.formGroup} pt-3`}>
                      <span
                        className={`${
                          errors.userName &&
                          "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        className={`${style.formField} ${
                          errors.userName && "border-danger "
                        }`}
                        type="text"
                        placeholder="User Name"
                        autoComplete="off"
                        {...register("userName", {
                          required: "User Name is Required",
                          pattern: {
                            value: /[A-Za-z]{4,7}[\d]{1}/gm,
                            message:
                              "The user name must contain characters and end with numbers without spaces.",
                          },
                          maxLength: {
                            value: 8,
                            message:
                              "The user name may not be greater than 8 characters.",
                          },
                          minLength: {
                            value: 4,
                            message:
                              "The user name must be at least 4 characters.",
                          },
                        })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="userName"
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
                    {/* {errors.userName && (
                      <p className="text-start text-danger ps-2">
                        {errors.userName.message}
                      </p>
                    )} */}
                    {/************* country  *******************/}
                    <div className={`${style.formGroup} pt-3`}>
                      <span
                        className={`${
                          errors.country && "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-earth-africa"></i>
                      </span>

                      <input
                        className={`${style.formField} ${
                          errors.country && "border-danger "
                        }`}
                        type="text"
                        placeholder="Country"
                        autoComplete="off"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="text-start text-danger ps-2">
                        {errors.country.message}
                      </p>
                    )}
                    {/************* phone  *******************/}
                    <div className={`${style.formGroup} password pt-3 `}>
                      <span
                        className={`${
                          errors.phoneNumber &&
                          "bg-danger text-white border-danger"
                        }`}
                      >
                        <i className="fa-solid fa-mobile-screen-button"></i>
                      </span>
                      <input
                        className={`${style.formField} ${
                          errors.phoneNumber && "border-danger "
                        }`}
                        type="tel"
                        placeholder="Phone Number"
                        autoComplete="off"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[\d]{1,18}$/gm,
                            message: "Phone digits only",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-start text-danger ps-2">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="col-md-6">
                    {/************* email  *******************/}
                    <div className={`${style.formGroup} pt-3`}>
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
                        type="email"
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

                    {/************* password  *******************/}
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
                        placeholder="Password"
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
                    {/************* confirm password  *******************/}
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
                        placeholder="Confirm Password"
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
                  </div>
                </div>
                <div className="py-2 mt-2 text-center formImage">
                  <div className={`mb-2 `}>
                    <input
                      className={`inputImg w-100    ${
                        errors.recipeImage && "border-danger "
                      }`}
                      type="file"
                      accept="image/*"
                      placeholder="Recipe Price"
                      {...register("profileImage", {
                        // required: "Image is required",
                      })}
                      onChange={({ target: { files } }) => {
                        files[0] && setFileName(files[0].name);
                        if (files) {
                          setImage(URL.createObjectURL(files[0]));
                          console.log(URL.createObjectURL(files[0]));
                        }
                      }}
                    />
                    {image ? (
                      <div className="d-flex flex-column justify-content-center  align-items-center">
                        <img
                          src={image}
                          width={60}
                          height={60}
                          alt={fileName}
                        />
                      </div>
                    ) : (
                      <div className="d-flex flex-column justify-content-center  align-items-center text-success">
                        <i className="fa-solid fa-upload  mb-1"></i>
                        <span> Choose a Item Image to Upload</span>
                      </div>
                    )}
                  </div>
                  <span className="text-dark">
                    {" "}
                    {fileName}{" "}
                    {image ? (
                      <i
                        onClick={() => {
                          setFileName("No Selected File");
                          setImage(null);
                        }}
                        className="fa-solid fa-trash-can  text-success align-self-end  ms-2"
                      ></i>
                    ) : (
                      ""
                    )}
                  </span>
                  {errors.profileImage && (
                    <p className="text-start text-danger ps-2">
                      {errors.profileImage.message}
                    </p>
                  )}
                </div>

                <div className={`links d-flex justify-content-between pt-2`}>
                  <Link to={"/verifyaccount"} className={`${style.btnLinks}`}>
                    Verify Account?
                  </Link>
                  <Link
                    to={"/login"}
                    className={`${style.btnLinks} ${style.btnColor} `}
                  >
                    Login Now?
                  </Link>
                </div>
                <button className={`btn w-100 mt-3 ${style.btnSubmit}`}>
                  {isLoading ? btnloading() : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
