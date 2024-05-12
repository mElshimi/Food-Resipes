import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";
import "./RecipesList.css";
import ResponsivePagination from "react-responsive-pagination";
import { AuthContext } from "../../../../context/AuthContext";
export default function RecipesList() {
  const { baseUrl, requestHeaders, loginData, loading, allCategories } =
    useContext(AuthContext);
  const navigate = useNavigate();
  // return the component header data
  const componentHeaderData = {
    title: () => {
      return (
        <>
          Recipes <span>Items</span>
        </>
      );
    },
    description:
      "You can now add your items that any user can order it from the Application and you can edit",
    image: imgs.header2,
  };

  // save  the boolean to handle  showing and hiding the add delete
  const [showDelete, setShowDelete] = useState(false);
  // save  the id of category that we want to delete it or edit
  const [idRecipe, setIdRecipe] = useState(null);
  // save  the name of category that we want to delete it or edit
  const [nameRecipe, setNameRecipe] = useState(null);
  // for window wideth

  // save  the tags for handle searsh by tag
  const [tags, setTags] = useState([]);
  // save the data of categories
  const [showShowItem, setShowShowItem] = useState(false);
  const [itemShow, setItemShow] = useState({});
  const [categories, setCategories] = useState([]);
  // State for page number
  const [pageNumber, setPageNumber] = useState(0);
  // State for total number of pages
  const [totalPages, setTotalPages] = useState(0);
  const [searchValues, setSearchValues] = useState({
    recipeName: "",
    recipeTag: "",
    recipeCat: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [favId, setFavId] = useState(null);
  const getSearchValues = (e) => {
    const values = { ...searchValues };
    values[e.target.name] = e.target.value;
    setSearchValues(values);
    getRecipes(values, 10, 1);
  };
  const [favReomve, setFavReomve] = useState(false);

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

  // states
  // save the data of recipes
  const [recipes, setRecipes] = useState([]);
  const handleShowShowItem = (item) => {
    setItemShow(item);
    // console.log(item);
    setShowShowItem(true);
  };
  const handleCloseShowItem = () => {
    setItemShow({});
    setShowShowItem(false);
  };

  // tags
  const getTags = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tag `, {
        headers: requestHeaders,
      });
      setTags(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // function for handling hiding the add and edit modal
  const handleCloseDelete = () => {
    // resetting the values to default after closing the modal
    setShowDelete(false);
    setIdRecipe(null);
    setNameRecipe(null);
  };

  // function for handling showing the delete modal
  const handleShowDelete = (id, name) => {
    // set the values to handle  them in the delete process
    setIdRecipe(id);
    setNameRecipe(name);
    setShowDelete(true);
  };

  // get categories  data from server
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=${allCategories}&pageNumber=1`,
        {
          headers: requestHeaders,
          params: {},
        }
      );
      setCategories(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // get categories  data from server
  const getRecipes = async (values, pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            name: values.recipeName,
            tagId: values.recipeTag,
            categoryId: values.recipeCat,
          },
        }
      );

      setRecipes(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const onDeleteSubmit = async () => {
    handleCloseDelete();
    try {
      const response = await axios.delete(`${baseUrl}/Recipe/${idRecipe}`, {
        headers: requestHeaders,
      });
      getRecipes(searchValues, 10);
      toast.success(`Deleted ${nameRecipe} Successfully`);
    } catch (err) {
      console.log(err);
    }
  };

  // ///////////////////

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
  const [favsList, setFavsList] = useState([]);

  // get categories  data from server
  const getFavsRecipes = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe?pageSize=10&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setFavsList(response.data.data);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
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
  ///////////////////////////
  // use effect to invoke recipes after the component mount
  useEffect(() => {
    // invoke recipes
    getRecipes(searchValues, 10);
    getTags();
    getCategories();
    getFavsRecipes();
  }, [pageNumber, searchValues]);

  return (
    <>
      {/* component header */}
      <Header
        title={componentHeaderData.title()}
        description={componentHeaderData.description}
        imgUrl={componentHeaderData.image}
      />

      {/* recipes list section */}
      <section className={`recipe-list overflow-x-hidden `}>
        <div className={`container-fluid d-flex flex-column `}>
          {/* recipes list head */}
          <div className={`categoriesHead text-center `}>
            <div className={`row`}>
              <div className={`col-6`}>
                <div className={`head-title`}>
                  <h3>Recipes Table Details</h3>
                </div>
              </div>
              <div className={`col-6 d-flex justify-content-end `}>
                <div className={`categories-add-btn`}>
                  {loginData?.userGroup == "SuperAdmin" ? (
                    <button
                      onClick={() => {
                        navigate("/dashboard/recipeData");
                      }}
                    >
                      Add New Recipe
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* filteration */}
          <div className={`filteration mt-3 `}>
            <div className="row">
              <div className="col-md-6">
                <div className="pt-2">
                  <input
                    className={`formFieldRecipe  bgInput `}
                    type="search"
                    placeholder="Search by Recipe Name"
                    onChange={getSearchValues}
                    name="recipeName"
                  />
                </div>
              </div>
              <div className="col-md-3">
                {/* tags */}
                <div className="pt-2">
                  <select
                    onChange={getSearchValues}
                    name="recipeTag"
                    className={`formFieldRecipe `}
                  >
                    <option value="">Searsh by Tag</option>
                    {tags.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                {/* categories */}
                <div className="pt-2">
                  <select
                    onChange={getSearchValues}
                    name="recipeCat"
                    className={`formFieldRecipe `}
                  >
                    <option value="">Searsh by Category</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* recipes list body */}
          <div className={`recipesBody mt-4 `}>
            <ul className="responsive-table-recipes ">
              <li className="table-header  ">
                <div className="col col-1 ">#</div>
                <div role="button" className="col col-2">
                  Recipe Name
                </div>
                <div className="col col-3">Image</div>
                <div className="col col-4">Price</div>
                <div className="col col-5">Description</div>
                <div className="col col-6">Category</div>
                <div className="col col-7">Tag</div>
                <div className="col col-8">Actions</div>
              </li>
            </ul>

            {isLoading ? (
              <div className="container text-center mt-5 pt-5">
                {/* <i className="fa-solid fa-spinner fa-spin fa-5x text-success "></i> */}
                {loading()}
              </div>
            ) : (
              <ul className="responsive-table-recipes">
                {recipes.length > 0 ? (
                  recipes.map((item, index) => (
                    <li key={index} className="table-row  ">
                      <div className="col col-1 " data-label="#">
                        {index + 1}
                      </div>
                      <div className="col col-2 " data-label="Recipe Name :">
                        {item.name}
                      </div>
                      <div className="col col-3 " data-label="Image :">
                        {item.imagePath ? (
                          <img
                            className="recipe-img "
                            src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                            alt=""
                          />
                        ) : (
                          <img
                            className="recipe-img-not"
                            src={imgs.recipeImgNot}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="col col-4 " data-label="Price :">
                        {item.price}
                      </div>
                      <div className="col col-5 " data-label="Description :">
                        {item.description}
                      </div>
                      <div className="col col-6 " data-label="Category :">
                        {item.category[0]?.name}
                      </div>
                      <div className="col col-7 " data-label="Tag :">
                        {item.tag.name}
                      </div>
                      <div className="col col-8 " data-label="Actions :">
                        <div className="btn-group">
                          {window.innerWidth < 650 ? (
                            ""
                          ) : (
                            <i
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              className="fa-solid fa-ellipsis"
                            ></i>
                          )}

                          <ul
                            className={`${
                              window.innerWidth < 650
                                ? "d-flex  align-items-center  justify-content-center "
                                : "dropdown-menu dropdown-menu-end"
                            }  m-0 p-0`}
                          >
                            <li
                              onClick={() => handleShowShowItem(item)}
                              role="button"
                              className="px-3 py-1 pt-2  "
                            >
                              <div className="dropdown-div ">
                                <i className="fa-regular fa-eye me-2"></i>
                                {window.innerWidth < 650 ? (
                                  ""
                                ) : (
                                  <span>View</span>
                                )}
                              </div>
                            </li>
                            {loginData?.userGroup == "SuperAdmin" ? (
                              <li
                                role="button"
                                onClick={() =>
                                  navigate("/dashboard/recipeData", {
                                    state: item,
                                  })
                                }
                                className="px-3 py-1"
                              >
                                <div role="button" className="dropdown-div">
                                  <i className="fa-regular fa-pen-to-square me-2 "></i>
                                  {window.innerWidth < 650 ? (
                                    ""
                                  ) : (
                                    <span>Edit</span>
                                  )}
                                </div>
                              </li>
                            ) : (
                              ""
                            )}
                            {loginData?.userGroup == "SuperAdmin" ? (
                              <li
                                role="button"
                                onClick={() =>
                                  handleShowDelete(item.id, item.name)
                                }
                                className="px-3 py-1 "
                              >
                                <div className="dropdown-div">
                                  <i className="fa-solid fa-trash-can me-2"></i>
                                  {window.innerWidth < 650 ? (
                                    ""
                                  ) : (
                                    <span>Delelte</span>
                                  )}
                                </div>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <NoData />
                )}
              </ul>
            )}
          </div>
          {isLoading ? (
            ""
          ) : (
            <ResponsivePagination
              current={pageNumber}
              total={totalPages}
              onPageChange={setPageNumber}
            />
          )}

          {/* modal handle delete  */}
          <Modal
            className="posModalDelete"
            show={showDelete}
            onHide={handleCloseDelete}
          >
            <Modal.Body className="mt-2 px-4">
              <div className="addCatModalHead text-end">
                <div className="addCatModalHeadClose ">
                  <i
                    onClick={() => handleCloseDelete()}
                    className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
                  ></i>
                </div>
              </div>

              {/* ------------  */}
              <div className="addCatModalBody ">
                <DeleteData deleteItem={nameRecipe} />
              </div>
              {/* ------------- */}
              <div className="addCatModalFooter"></div>
            </Modal.Body>
            <ModalFooter className="py-3">
              <button
                onClick={onDeleteSubmit}
                className={`btn py-1 px-3 fs-6  fw-medium  btn btn-outline-danger `}
              >
                `Delete this ${nameRecipe}`
              </button>
            </ModalFooter>
          </Modal>
          {/* modal handle show item  */}
          <Modal className=" " show={showShowItem} onHide={handleCloseShowItem}>
            <Modal.Body className="px-4">
              <div className="addCatModalHead text-end">
                <div className="addCatModalHeadClose ">
                  <i
                    onClick={() => handleCloseShowItem()}
                    className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
                  ></i>
                </div>
              </div>

              {/* ------------  */}
              <div className="addCatModalBody pt-2 ">
                {itemShow.imagePath ? (
                  <img
                    className="w-100  mb-4"
                    src={`https://upskilling-egypt.com:3006/${itemShow.imagePath}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="recipe-img-not  mb-4"
                    src={imgs.recipeImgNot}
                    alt=""
                  />
                )}
                <table className=" table">
                  <tbody>
                    <tr className="fs-4 ">
                      <th className="text-start" scope="row">
                        <i className="fa-solid fa-utensils"></i>
                      </th>
                      <td className="text-start ">{itemShow.name}</td>
                    </tr>
                    <tr className="fs-4">
                      <th className="text-start" scope="row">
                        <i className="fa-solid fa-money-bill-1-wave"></i>
                      </th>
                      <td className="text-start">{itemShow.price}</td>
                    </tr>
                    <tr className="fs-4">
                      <th className="text-start" scope="row">
                        <i className="fa-solid fa-tags"></i>
                      </th>
                      <td className="text-start">{itemShow.tag?.name}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => {
                    navigate("/dashboard/recipeDetails", {
                      state: {
                        recipe: itemShow,
                        lastLocation: location.pathname,
                      },
                    });
                  }}
                  className="see-more-btn d-flex align-items-center"
                >
                  See More <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </button>
              </div>
              {/* ------------- */}
              <div className="addCatModalFooter"></div>
            </Modal.Body>
            <ModalFooter className="py-3">
              {loginData?.userGroup == "SystemUser" ? (
                favsList.some((fav) => fav.recipe.id == itemShow.id) ? (
                  <i
                    role="button"
                    onClick={() =>
                      handlefavReomveShow(itemShow.id, itemShow.name)
                    }
                    className=" fa-solid fa-heart text-danger  fs-1"
                  ></i>
                ) : (
                  <i
                    onClick={() => addToFavs({ recipeId: itemShow.id })}
                    role="button"
                    className=" fa-regular fa-heart fs-1"
                  ></i>
                )
              ) : (
                <button
                  onClick={handleCloseShowItem}
                  className="btn btn-outline-success "
                >
                  Back
                </button>
              )}
            </ModalFooter>
          </Modal>

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
    </>
  );
}
