import React, { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import "./FaveList.css";
import { useNavigate } from "react-router-dom";
// import Select from "react-select";

export default function FaveList() {
  const { baseUrl, requestHeaders, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const componentHeaderData = {
    title: () => {
      return (
        <>
          Favorite <span>Items</span>
        </>
      );
    },
    description:
      "You can now add your items that any user can order it from the Application and you can edit",
    image: imgs.header2,
  };
  const [favsList, setFavsList] = useState([]);
  const [isLoading, setIsLoadin] = useState(false);

  // get categories  data from server
  const getFavsRecipes = async () => {
    setIsLoadin(true);
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe?pageSize=100&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setFavsList(response.data.data);

      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoadin(false);
  };
  const removeFavsRecipes = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/userRecipe/${id}`, {
        headers: requestHeaders,
      });
      // setFavsList(response.data.data);
      toast.success(`Remove From Favorite Successfully`);
      getFavsRecipes();
      // console.log(response.data.data);
    } catch (err) {
      toast.success(`Error on Deleted From Favorite`);
    }
  };

  useEffect(() => {
    getFavsRecipes();
  }, []);

  return (
    <>
      <Header
        title={componentHeaderData.title()}
        description={componentHeaderData.description}
        imgUrl={componentHeaderData.image}
      />
      <section className="favs-list  ">
        {isLoading ? (
          <div className="container text-center mt-5 pt-5">{loading()}</div>
        ) : (
          <div className="container ">
            <div className="row gy-4">
              {favsList?.length > 0 ? (
                favsList.map((fav) => (
                  <div key={fav.id} className="col-xl-3 col-lg-4 col-md-6 ">
                    <div className="fav-recipe shadow rounded-3 position-relative ">
                      <div>
                        {fav.recipe.imagePath ? (
                          <img
                            className="w-100 rounded-start-3 rounded-end-3 "
                            height={300}
                            src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                            alt=""
                          />
                        ) : (
                          <div className="text-center">
                            <img src={imgs.noData} alt="" />
                            <h6>image not found</h6>
                          </div>
                        )}
                      </div>
                      <div className="pt-3 px-3">
                        <h5>{fav.recipe.name}</h5>
                        <h6>{fav.recipe.price}</h6>
                        <h6>{fav.recipe.tag.name}</h6>
                        {/* <p className="fave-description">
                          {fav.recipe.description}
                        </p> */}
                      </div>
                      <div
                        onClick={() => removeFavsRecipes(fav.id)}
                        role="button"
                        className=" position-absolute top-0 end-0  px-1 m-2  bg-body rounded-2"
                      >
                        <i className="fa fa-heart text-danger"></i>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/dashboard/recipeDetails", {
                            state: {
                              recipe: fav.recipe,
                              lastLocation: location.pathname,
                            },
                          });
                        }}
                        className="see-more-btn-fav d-flex align-items-center "
                      >
                        See More
                        <i className="fa-solid fa-arrow-right-long ms-2"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
