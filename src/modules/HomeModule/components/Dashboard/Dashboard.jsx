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
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="dash-card text-start">
                  <i className="fa fa-users fa-2x ms-4" aria-hidden="true"></i>
                  <h6>Users</h6>
                  <h4>{allUsersSystem}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="dash-card text-start">
                  <i
                    className="fa fa-user-tie fa-2x ms-4"
                    aria-hidden="true"
                  ></i>
                  <h6>Admins</h6>
                  <h4>{allUsersAdmin}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="dash-card text-start ">
                  <i
                    className="fa fa-table-list fa-2x ms-4"
                    aria-hidden="true"
                  ></i>
                  <h6>Categories</h6>
                  <h4>{allCategories}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="dash-card text-start">
                  <i
                    className="fa fa-bowl-rice fa-2x ms-4"
                    aria-hidden="true"
                  ></i>
                  <h6>Recipes</h6>
                  <h4>{allRecipes}</h4>
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
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="dash-card text-start">
                <i
                  className="fa-solid fa-heart fa-2x ms-4"
                  aria-hidden="true"
                ></i>
                <h6>Your Favs</h6>
                <h6>{allFavs}</h6>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="dash-card text-start">
                <i
                  className="fa fa-bowl-rice fa-2x ms-4"
                  aria-hidden="true"
                ></i>
                <h6>Recipes</h6>
                <h4>{allRecipes}</h4>
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
