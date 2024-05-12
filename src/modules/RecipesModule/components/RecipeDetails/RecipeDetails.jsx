import React, { useContext, useState, useEffect } from "react";
import "./RecipeDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import imgs from "../../../ImagesMoudel/components/Images/Images";
export default function RecipeDetails() {
  const { baseUrl, requestHeaders, loginData, loading } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state.recipe;
  const lastLoation = location.state.lastLocation;
  const [favsList, setFavsList] = useState([]);
  const [favId, setFavId] = useState(null);
  const [nameRecipe, setNameRecipe] = useState(null);
  const [favReomve, setFavReomve] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(recipe);
  console.log(lastLoation);
  const handlefavReomveClose = () => {
    setFavReomve(false);
    setFavId(null);
    setNameRecipe(null);
  };
  const handlefavReomveShow = (id, name) => {
    favsList.forEach((fav) => {
      if (fav.recipe.id == id) {
        setFavId(fav.id);
      }
    });
    setFavReomve(true);
    setNameRecipe(name);
  };
  const removeFavsRecipes = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/userRecipe/${favId}`, {
        headers: requestHeaders,
      });
      // setFavsList(response.data.data);
      toast.success(`Remove From Favorite Successfully`);
      getFavsRecipes();
      handlefavReomveClose();
      // console.log(response.data.data);
    } catch (err) {
      toast.success(`Error on Deleted From Favorite`);
    }
  };
  // get categories  data from server
  const getFavsRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe?pageSize=10&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setFavsList(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const addToFavs = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}/userRecipe`, id, {
        headers: requestHeaders,
      });

      getFavsRecipes();
      toast.success(`Added To Favorite Successfully`);

      // navigate("/dashboard/favs");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  useEffect(() => {
    getFavsRecipes();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container text-center mt-5 pt-5">{loading()}</div>
      ) : (
        <section className="Recipe-details mt-5">
          <div className="container">
            <div className="recipe-det-body">
              <div className="text-end mb-3">
                <div className="d-flex justify-content-between ">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-success "
                  >
                    Back
                  </button>
                  {loginData?.userGroup == "SystemUser" ? (
                    favsList.some((fav) => fav.recipe.id == recipe.id) ? (
                      <i
                        role="button"
                        onClick={() =>
                          handlefavReomveShow(recipe.id, recipe.name)
                        }
                        className=" fa-solid fa-heart text-danger  fs-1"
                      ></i>
                    ) : (
                      <i
                        onClick={() => addToFavs({ recipeId: recipe.id })}
                        role="button"
                        className=" fa-regular fa-heart fs-1"
                      ></i>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row align-items-center gy-3">
                <div className="col-md-6">
                  <div>
                    {recipe.imagePath ? (
                      <img
                        className="w-75"
                        src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-evenly ">
                        <img src={imgs.noData} alt="" />
                        <h3>image not found</h3>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <table className="table table-hover">
                      <tbody>
                        <tr className="fs-4 ">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-utensils"></i>
                          </th>
                          <td className="text-start ">{recipe.name}</td>
                        </tr>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-money-bill-1-wave"></i>
                          </th>
                          <td className="text-start">{recipe.price}</td>
                        </tr>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-tags"></i>
                          </th>
                          <td className="text-start">{recipe.tag?.name}</td>
                        </tr>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-table-list"></i>
                          </th>
                          <td className="text-start">
                            {recipe.category[0]?.name}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <div>
                    <table className="table table-hover">
                      <tbody>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-id-card"></i>
                          </th>
                          <td className="text-start">{recipe.id}</td>
                        </tr>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-quote-left"></i>
                          </th>
                          <td className="text-start">{recipe.description}</td>
                        </tr>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-calendar-days"></i>
                          </th>
                          <td className="text-start">
                            {moment(recipe.creationDate).format("LLLL")}
                          </td>
                        </tr>
                        <tr className="fs-4">
                          <th className="text-start" scope="row">
                            <i className="fa-solid fa-file-pen"></i>
                          </th>
                          <td className="text-start">
                            {moment(recipe.modificationDate).fromNow()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* **********  fav remove ********** */}
            <Modal
              className="modal-remove"
              show={favReomve}
              onHide={handlefavReomveClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>{nameRecipe}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>
                  This recipe has already been added, Do you want to remove it?
                </h6>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-evenly ">
                <button
                  onClick={handlefavReomveClose}
                  className="btn btn-outline-success px-5"
                >
                  No !
                </button>
                <button
                  onClick={removeFavsRecipes}
                  className="btn btn-outline-danger "
                >
                  Yes Remove !
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      )}
    </>
  );
}
