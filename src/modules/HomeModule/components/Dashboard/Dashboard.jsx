import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import Header from "../../../SharedModule/components/Header/Header";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
import { AuthContext } from "../../../../context/AuthContext";
export default function Dashboard() {
  const {
    loginData,
    allRecipes,
    allCategories,
    allUsersSystem,
    allUsersAdmin,
    allFavs,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const componentHeaderData = {
    title: () => {
      return (
        <>
          Welcome <span>{loginData?.userName} !</span>
        </>
      );
    },
    description:
      "This is a welcoming screen for the entry of the application , you can now see the options",
    image: imgs.header1,
  };

  return (
    <>
      <div>
        <Header
          title={componentHeaderData.title()}
          description={componentHeaderData.description}
          imgUrl={componentHeaderData.image}
        />
      </div>
      {loginData?.userGroup == "SuperAdmin" ? (
        <>
          <div>
            <RecipesListHeader
              btnOnClick={() => {
                navigate("/dashboard/recipeData");
              }}
              btnName={"Fill Recipes"}
            />
          </div>
          <div className="info container mt-5 mb-3">
            <div className="row  gy-2 ">
              <div className="col-lg-3 col-md-6">
                <div className="dash-card">
                  <i className="fa fa-users fa-3x" aria-hidden="true"></i>
                  <h4>
                    Users <span>{allUsersSystem}</span>{" "}
                  </h4>
                  <button
                    onClick={() => {
                      navigate("/dashboard/users");
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-long fa-2x"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="dash-card">
                  <i className="fa fa-user-tie fa-3x" aria-hidden="true"></i>
                  <h4>
                    Admins <span>{allUsersAdmin}</span>{" "}
                  </h4>
                  <button
                    onClick={() => {
                      navigate("/dashboard/users");
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-long fa-2x"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="dash-card">
                  <i className="fa fa-table-list fa-3x" aria-hidden="true"></i>
                  <h4>
                    Categories <span>{allCategories}</span>
                  </h4>
                  <button
                    onClick={() => {
                      navigate("/dashboard/categories");
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-long fa-2x"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="dash-card">
                  <i className="fa fa-bowl-rice fa-3x" aria-hidden="true"></i>
                  <h4>
                    Recipes <span>{allRecipes}</span>
                  </h4>
                  <button
                    onClick={() => {
                      navigate("/dashboard/recipes");
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-long fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {loginData?.userGroup == "SystemUser" ? (
        <div className="info container mt-5">
          <div className="row gy-2">
            <div className="col-lg-6 ">
              <div className="dash-card d-flex justify-content-evenly align-items-center   ">
                <i className="fa-solid fa-heart fa-3x" aria-hidden="true"></i>
                <h4>
                  Your Favs <span>{allFavs}</span>
                </h4>
                <button
                  onClick={() => {
                    navigate("/dashboard/favs");
                  }}
                >
                  <i className="fa-solid fa-arrow-right-long fa-2x"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="dash-card d-flex justify-content-evenly align-items-center">
                <i className="fa fa-bowl-rice fa-3x" aria-hidden="true"></i>
                <h4>
                  All Recipes <span>{allRecipes}</span>
                </h4>
                <button
                  onClick={() => {
                    navigate("/dashboard/recipes");
                  }}
                >
                  <i className="fa-solid fa-arrow-right-long fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
