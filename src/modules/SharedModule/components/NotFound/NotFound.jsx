import React from "react";
import style from "./NotFound.module.css";
import images from "../../../ImagesMoudel/components/Images/Images";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <section className={`${style.NotFound}  vh-100`}>
        <img className={`${style.vector} `} src={images.notVector} alt="" />
        <img className={` ${style.authImg}`} src={images.authImg} alt="" />
        <div className="container">
          <div className={`row ${style.content}`}>
            <div className="col-lg-6  z-3">
              <div className={`${style.textSide} `}>
                <h3>Oops.</h3>
                <h4>Page not found </h4>
                <p>
                  This Page doesn’t exist or was removed! We suggest you back to
                  home.
                </p>
                <button onClick={() => goBack()}>
                  <span>Back To</span> <span>Home</span>
                  <i className="fa-solid fa-arrow-left  fa-beat "></i>
                </button>
              </div>
            </div>
            <div className="col-lg-6 z-3">
              <div className={`${style.robotSide}  fa-bounce `}>
                <img src={images.robot2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
