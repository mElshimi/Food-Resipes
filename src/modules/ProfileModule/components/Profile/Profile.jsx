import React, { useContext, useState } from "react";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import Header from "../../../SharedModule/components/Header/Header";
import { AuthContext } from "../../../../context/AuthContext";
import moment from "moment";
import { ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useForm } from "react-hook-form";
import style from "../../../AuthenticationModule/components/Auth.module.css";
import { toast } from "react-toastify";

export default function Profile() {
  const {
    currUser,
    baseUrl,
    requestHeaders,
    getCurrentUser,
    btnloading,
    loading,
  } = useContext(AuthContext);
  const [now, setNow] = useState();
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected File");
  const [updateDetails, setUpdateDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [hidePassInInpt, setHidePassInInpt] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  setTimeout(() => {
    setNow(moment().format("a"));
  }, 1000);

  const handleUpdateDetails = () => {
    setUpdateDetails(true);
    setImage(`https://upskilling-egypt.com:3006/${currUser?.imagePath}`);
    reset({
      userName: currUser.userName,
      email: currUser.email,
      country: currUser.country,
      phoneNumber: currUser.phoneNumber,
      confirmPassword: currUser.confirmPassword,
    });
  };
  const handleCloseUpdateDetails = () => {
    setUpdateDetails(false);
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    const registerFormData = appendToFormData(data);
    try {
      const response = await axios.put(`${baseUrl}/Users`, registerFormData, {
        headers: requestHeaders,
      });
      toast.success(`Updated your details successfully`);
      setUpdateDetails(false);
      getCurrentUser();
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
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };
  console.log(currUser);

  return (
    <>
      {isLoading ? (
        <div className="container text-center mt-5 pt-5">{loading()}</div>
      ) : (
        <section className="my-4">
          <div className={`container-fluid  container-header `}>
            <div className={`header`}>
              <div className="row  align-items-center text-center py-3 mx-5 ">
                <div className="col-md-8 ">
                  <div className="header-content">
                    <h2>
                      {now == "am" ? <>Good Morning</> : <>Good Evening</>}
                      <span> {currUser?.userName} !</span>
                    </h2>
                    <p>Sending you good vibes!</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {currUser?.imagePath ? (
                    <div className="header-img-profile me-5 ms-auto">
                      <img
                        className="w-100"
                        src={`https://upskilling-egypt.com:3006/${currUser?.imagePath}`}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="header-char-profile me-5 ms-auto">
                      <h2>{currUser?.userName?.charAt(0).toUpperCase()}</h2>
                      {/* <img className="w-100" src={imgs.userAvatar} alt="" /> */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 container-fluid ">
              <table className="table table-hover mt-5 ">
                <tbody>
                  <tr className="th-profile">
                    <th className="th-profile" scope="row">
                      User Name
                    </th>
                    <td className="td-profile">{currUser?.userName}</td>
                  </tr>
                  <tr>
                    <th className="th-profile" scope="row">
                      Phone Number
                    </th>
                    <td className="td-profile">{currUser?.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th className="th-profile" scope="row">
                      E-mail
                    </th>
                    <td className="td-profile">{currUser?.email}</td>
                  </tr>
                  <tr>
                    <th className="th-profile" scope="row">
                      Country
                    </th>
                    <td className="td-profile">{currUser?.country}</td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={handleUpdateDetails}
                className="btn btn-outline-success mt-4"
              >
                Update Your Details
              </button>
            </div>
            {/* ********************************************************** */}

            {/* modal handle show item  */}
            <Modal
              className="mt-3"
              show={updateDetails}
              onHide={handleCloseUpdateDetails}
            >
              <Modal.Body className="px-4">
                <div className="addCatModalHead text-end">
                  <div className="addCatModalHeadClose ">
                    <i
                      onClick={() => handleCloseUpdateDetails()}
                      className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
                    ></i>
                  </div>
                </div>

                {/* ------------  */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="addCatModalBody pt-2 pb-4">
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
                    {/* ************ img ****************** */}
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
                        {fileName}
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
                  </div>
                  {/* ------------- */}
                  {/************* password  *******************/}
                  <div className={`${style.formGroup} password `}>
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
                      placeholder="Confirm Password "
                      autoComplete="off"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
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
                  {errors.confirmPassword && (
                    <p className="text-start  text-danger ps-2">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <ModalFooter className="text-start">
                    <button className={`btn w-100  ${style.btnSubmit}`}>
                      Update
                    </button>
                  </ModalFooter>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      )}
    </>
  );
}
