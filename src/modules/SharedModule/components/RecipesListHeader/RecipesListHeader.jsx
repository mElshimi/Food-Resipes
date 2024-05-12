import React from "react";
import "./RecipesListHeader.css";

export default function RecipesListHeader({ btnName, btnOnClick }) {
  return (
    <>
      <div className={` container-fluid  `}>
        <div className="bg-header-recipes rounded-3  py-4 ">
          <div className="row py-2 align-items-center justify-content-center    ">
            <div className="col-md-6">
              <h3 className="">
                Fill the <span>Recipes</span> !
              </h3>
              <p>
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end ">
              <button onClick={btnOnClick} className="btnGoToRecipe">
                {btnName} <i className="fa-solid fa-arrow-right ms-2"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
