import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "../../../AuthenticationModule/components/Auth.module.css";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";
import ResponsivePagination from "react-responsive-pagination";
import "./CategriesList.css";
import { AuthContext } from "../../../../context/AuthContext";
import { ToastContext } from "../../../../context/ToastContext";

export default function CategoriesList() {
  const { baseUrl, requestHeaders, loading, getAllCategories } =
    useContext(AuthContext);
  const { getToastValue } = useContext(ToastContext);
  const navgate = useNavigate();
  // states
  // save the data of categories
  const [categories, setCategories] = useState([]);
  // save  the boolean to handle  showing and hiding the add and edit modal
  const [show, setShow] = useState(false);
  // save  the id of category that we want to delete it or edit
  const [idCategory, setIdCategory] = useState(null);
  // save  the name of category that we want to delete it or edit
  const [nameCategory, setNameCategory] = useState(null);
  // save  the boolean to handle  showing and hiding the add delete
  const [showDelete, setShowDelete] = useState(false);
  // save  the boolean to handle btn is add or update category
  const [checkIsUpdate, setCheckIsUpdate] = useState(false);
  const [nameValue, setNameValue] = useState("");

  const [showShowItem, setShowShowItem] = useState(false);
  // State for page number
  const [pageNumber, setPageNumber] = useState(0);
  // State for total number of pages
  const [totalPages, setTotalPages] = useState(0);

  const [itemShow, setItemShow] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // function for get window width value
  const [allCategories, setAllCategories] = useState(0);

  // function for handling hiding the add and edit modal
  const handleClose = () => {
    // resetting the values to default after closing the modal
    setNameCategory(null);
    setIdCategory(null);
    setCheckIsUpdate(false);
    setShow(false);
    setValue("name", "");
  };

  // function for handling showing the add and edit modal
  const handleShow = () => setShow(true);
  const handleShowShowItem = (item) => {
    setItemShow(item);
    setShowShowItem(true);
  };
  const handleCloseShowItem = () => {
    setItemShow({});
    setShowShowItem(false);
  };

  // function for handling hiding the delete modal
  const handleCloseDelete = () => {
    // resetting the values to default after closing the modal
    setShowDelete(false);
    setIdCategory(null);
    setNameCategory(null);
  };

  // function for handling showing the delete modal
  const handleShowDelete = (id, name) => {
    // set the values to handle  them in the delete process
    setIdCategory(id);
    setNameCategory(name);
    setShowDelete(true);
  };

  // function for getting values to the update process
  const handleUpdate = (id, name) => {
    // invoke the function to show modal add and edit
    setShow(true);
    // set the values to handle  them in the update process
    setIdCategory(id);
    setNameCategory(name);
    setCheckIsUpdate(true);
    setValue("name", name);
  };

  // get categories  data from server
  const getCategories = async (name, pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            name: name,
          },
        }
      );

      setCategories(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
      getAllCategories();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  // use effect to invoke getCategories after the component mount
  useEffect(() => {
    // invoke getCategories
    getCategories("", 10);
    getAllCategories();
    // console.log(width);
  }, [pageNumber, nameValue]);

  // return the component header data
  const componentHeaderData = {
    title: () => {
      return (
        <>
          Categories <span>Items</span>
        </>
      );
    },
    description:
      "You can now add your items that any user can order it from the Application and you can edit",
    image: imgs.header2,
  };

  // destructing useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // function for submitting form data add categories to the server
  const onAddSubmit = async (data) => {
    handleClose();
    try {
      const response = await axios.post(`${baseUrl}/Category`, data, {
        headers: requestHeaders,
      });
      getCategories(nameValue, 10);
      toast.success(`Added ${data.name} Successfully`);

      setValue("name", "");
    } catch (err) {
      console.log(err);
    }
  
  };
  // function for delete category to the server
  const onDeleteSubmit = async () => {
    handleCloseDelete();
    try {
      const response = await axios.delete(`${baseUrl}/Category/${idCategory}`, {
        headers: requestHeaders,
      });
      getCategories(nameValue, 10);
      toast.success(`Deleted ${nameCategory} Successfully`);
    } catch (err) {
      console.log(err);
    }
  };
  // function for submitting form data edit category to the server
  const onUpdateSubmit = async (data) => {
    handleClose();
    try {
      const response = await axios.put(
        `${baseUrl}/Category/${idCategory}`,
        data,
        {
          headers: requestHeaders,
        }
      );
      getCategories(nameValue, 10);
      toast.success(`Updated ${nameCategory} Successfully`);
    } catch (err) {
      console.log(err);
    }
  };
  const getNameValue = (e) => {
    setNameValue(e.target.value);
    getCategories(e.target.value, 10);
  };
  return (
    <>
      {/* component header */}
      <Header
        title={componentHeaderData.title()}
        description={componentHeaderData.description}
        imgUrl={componentHeaderData.image}
      />

      {/* categories list section */}
      <section className={`categories-list`}>
        <div className={`container-fluid  d-flex flex-column `}>
          {/* categories list head */}
          <div className={`categoriesHead text-center`}>
            <div className={`row`}>
              <div className={`col-6`}>
                <div className={`head-title`}>
                  <h3>Categories Table Details</h3>
                </div>
              </div>
              <div className={`col-6 d-flex justify-content-end `}>
                <div className={`categories-add-btn`}>
                  <button onClick={handleShow}>Add New Category</button>
                </div>
              </div>
            </div>
          </div>

          {/* filteration */}
          <div className={`filteration mt-3`}>
            <div className="pt-2">
              <input
                className={`formFieldRecipe  bgInput `}
                type="search"
                placeholder="Search by Category Name"
                onChange={getNameValue}
              />
            </div>
          </div>

          {/* categories list body */}
          <div className={`categoriesBody mt-4 `}>
            <ul className="responsive-table-categories">
              <li className="table-header  ">
                <div className="col col-1 ">#</div>
                <div role="button" className="col col-2">
                  Category Name
                </div>
                <div className="col col-3">Creation Date</div>
                <div className="col col-4">Last Update</div>
                <div className="col col-5">Actions</div>
              </li>
            </ul>

            {isLoading ? (
              <div className="container text-center mt-5 pt-5">{loading()}</div>
            ) : (
              <ul className="responsive-table-categories">
                {categories.length > 0 ? (
                  categories.map((item, index) => (
                    <li key={index} className="table-row  ">
                      <div className="col col-1" data-label="#">
                        {index + 1}
                      </div>
                      <div className="col col-2" data-label="Category Name :">
                        {item.name}
                      </div>
                      <div className="col col-3" data-label="Creation Date :">
                        {moment(item.creationDate).format("LLLL")}
                        {/* {item.creationDate} */}
                      </div>
                      <div className="col col-4" data-label="Last Update :">
                        {/* {item.modificationDate} */}
                        {moment(item.modificationDate).fromNow()}
                      </div>
                      <div className="col col-5" data-label="Actions :">
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
                              role="button"
                              onClick={() => handleShowShowItem(item)}
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
                            <li
                              role="button"
                              onClick={() => handleUpdate(item.id, item.name)}
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

          {/* modal handle add and  update */}
          <Modal className="posModal" show={show} onHide={handleClose}>
            <Modal.Body className="mt-4 px-4">
              <div className="addCatModalHead d-flex justify-content-between align-items-center  ">
                <div className="addCatModalHeadTitle">
                  <h3
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "700",
                      fontSize: "25px",
                      lineHeight: "30.26px",
                    }}
                  >
                    {checkIsUpdate ? `Update ${nameCategory}` : "Add Category"}
                  </h3>
                </div>
                <div className="addCatModalHeadClose ">
                  <i
                    onClick={() => handleClose()}
                    className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
                  ></i>
                </div>
              </div>

              {/* ------------  */}
              <div className="addCatModalBody mt-5 pt-5">
                <form
                  onSubmit={handleSubmit(
                    !checkIsUpdate ? onAddSubmit : onUpdateSubmit
                  )}
                >
                  <div className={`${style.formGroup}`}>
                    <span
                      className={`${
                        errors.name && "bg-danger text-white border-danger"
                      }`}
                    >
                      <i className="fa-solid fa-table-list"></i>
                    </span>
                    <input
                      className={`${style.formField}   ${
                        errors.name && "border-danger "
                      }`}
                      type="text"
                      placeholder="Category Name"
                      {...register("name", {
                        required: "Category Name is Required",
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-start text-danger ps-2">
                      {errors.name.message}
                    </p>
                  )}

                  <ModalFooter className="mt-5 py-2 pt-3  ">
                    <button
                      className={`btn py-1 px-3 fs-6  fw-medium  ${style.btnSubmit}`}
                    >
                      {isLoading ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        `Save`
                      )}
                    </button>
                  </ModalFooter>
                </form>
              </div>
              {/* ------------- */}
              <div className="addCatModalFooter"></div>
            </Modal.Body>
          </Modal>

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
                <DeleteData deleteItem={nameCategory} />
              </div>
              {/* ------------- */}
              <div className="addCatModalFooter"></div>
            </Modal.Body>
            <ModalFooter className="py-3">
              <button
                onClick={onDeleteSubmit}
                className={`btn py-1 px-3 fs-6  fw-medium  btn btn-outline-danger `}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  ` Delete this ${nameCategory}`
                )}
              </button>
            </ModalFooter>
          </Modal>

          {/* modal handle show item  */}
          <Modal
            className="posModalDelete showModal"
            show={showShowItem}
            onHide={handleCloseShowItem}
          >
            <Modal.Body className="mt-2 px-4">
              <div className="addCatModalHead text-end">
                <div className="addCatModalHeadClose ">
                  <i
                    onClick={() => handleCloseShowItem()}
                    className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
                  ></i>
                </div>
              </div>

              {/* ------------  */}
              <div className="addCatModalBody py-4 text-center text-modal ">
                <h2>{itemShow.name}</h2>
                <table className=" table">
                  <tbody>
                    <tr className="fs-4 ">
                      <th className="text-start" scope="row">
                        <i className="fa-solid fa-id-card  "></i>
                      </th>
                      <td className="text-start ">{itemShow.id}</td>
                    </tr>
                    <tr className="fs-4">
                      <th className="text-start" scope="row">
                        <i className="fa-solid fa-calendar-days"></i>
                      </th>
                      <td className="text-start">
                        {moment(itemShow.creationDate).format("LLLL")}
                      </td>
                    </tr>
                    <tr className="fs-4">
                      <th className="text-start" scope="row">
                        <i className="fa-solid fa-file-pen"></i>
                      </th>
                      <td className="text-start">
                        {" "}
                        {moment(itemShow.modificationDate).fromNow()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <h2>{itemShow.name}</h2>
                <h5 className="text-start">
                  <i className="fa-solid fa-id-card"></i> : {itemShow.id}
                </h5>
                <h5 className="text-start">
                  <i className="fa-solid fa-calendar-days"></i> :{" "}
                  {moment(itemShow.creationDate).format("LLLL")}
                </h5>
                <h5 className="text-start">
                  <i className="fa-solid fa-file-pen"></i> :{" "}
                  {moment(itemShow.modificationDate).fromNow()}
                </h5> */}
              </div>
              {/* ------------- */}
              <div className="addCatModalFooter"></div>
            </Modal.Body>
            <ModalFooter className="py-3">
              <button
                onClick={handleCloseShowItem}
                className={`btn py-1 px-3 fs-6 fw-medium btn btn-outline-success `}
              >
                Back
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </section>
    </>
  );
}
