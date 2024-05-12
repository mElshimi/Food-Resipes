import React from "react";
import "./Header.css";

export default function Header({ description, title, imgUrl }) {
  // console.log(imgUrl);
  return (
    <>
      <section className="my-4">
        <div className={`container-fluid  container-header `}>
          <div className={`header`}>
            <div className="row align-items-center text-center pt-3 mx-5 ">
              <div className="col-md-8 ">
                <div className="header-content">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="header-img">
                  <img src={imgUrl} alt="" /> :
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
