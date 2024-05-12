import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import imgs from "../../../ImagesMoudel/components/Images/Images";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";
import ResponsivePagination from "react-responsive-pagination";
import { AuthContext } from "../../../../context/AuthContext";
export default function UsersList() {
  const { baseUrl, requestHeaders, loading, getUsersSystem } =
    useContext(AuthContext);
  const componentHeaderData = {
    title: () => {
      return (
        <>
          Users <span>List</span>
        </>
      );
    },
    description:
      "You can now add your items that any user can order it from the Application and you can edit",
    image: imgs.header2,
  };
  // states
  // save the data of users
  const [users, setUsers] = useState([]);
  // save  the boolean to handle  showing and hiding the add delete
  const [showDelete, setShowDelete] = useState(false);
  // save  the id of category that we want to delete it or edit
  const [idUser, setIduser] = useState(null);
  // save  the name of category that we want to delete it or edit
  const [nameUser, setNameUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValues, setSearchValues] = useState({
    userName: "",
    email: "",
    groupId: "",
  });
  const [showShowItem, setShowShowItem] = useState(false);
  // State for page number
  const [pageNumber, setPageNumber] = useState(0);
  // State for total number of pages
  const [totalPages, setTotalPages] = useState(0);
  const [userShow, setUserShow] = useState({});
  // function for handling hiding the delete modal
  const handleCloseDelete = () => {
    // resetting the values to default after closing the modal
    setShowDelete(false);
    setIduser(null);
    setNameUser(null);
  };

  // function for handling showing the delete modal
  const handleShowDelete = (id, name) => {
    // set the values to handle  them in the delete process
    setIduser(id);
    setNameUser(name);
    setShowDelete(true);
  };
  const handleShowShowItem = (user) => {
    setUserShow(user);
    setShowShowItem(true);
  };
  const handleCloseShowItem = () => {
    setUserShow({});
    setShowShowItem(false);
  };
  // get categories  data from server
  const getUsers = async (values, pageSize) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/Users/?groups=${values.groupId}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            userName: values.userName,
            email: values.email,
          },
        }
      );

      setUsers(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
      // console.log(res);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  // use effect to invoke getCategories after the component mount
  useEffect(() => {
    // invoke getCategories
    getUsers(searchValues, 20);
  }, [pageNumber, searchValues]);

  // function for delete category to the server
  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/Users/${idUser}`, {
        headers: requestHeaders,
      });
      getUsers(searchValues, 20);
      handleCloseDelete();
      toast.success(`Deleted ${nameUser} Successfully`);
      getUsersSystem();
    } catch (err) {
      toast.error(err.response.data.message);
      getUsers(searchValues, 20, 1);
      handleCloseDelete();
    }
  };

  const getSearchValues = (e) => {
    const values = { ...searchValues };
    values[e.target.name] = e.target.value;
    setSearchValues(values);
    getUsers(values, 20);
  };

  return (
    <>
      <Header
        title={componentHeaderData.title()}
        description={componentHeaderData.description}
        imgUrl={componentHeaderData.image}
      />
      <section className={`users-list overflow-x-hidden`}>
        <div className={`container-fluid  d-flex flex-column `}>
          {/* categories list head */}
          <div className={`categoriesHead text-center`}>
            <div className={`row`}>
              <div className={`col-6`}>
                <div className={`head-title`}>
                  <h3>Users Table Details</h3>
                </div>
              </div>
              <div className={`col-6 d-flex justify-content-end `}>
                <div className={`categories-add-btn`}></div>
              </div>
            </div>
          </div>

          {/* filteration */}
          <div className={`filteration mt-3`}>
            <div className="row">
              <div className="col-md-6">
                <div className="pt-2">
                  <input
                    className={`formFieldRecipe  bgInput `}
                    type="search"
                    placeholder="Search by Recipe Name"
                    // onChange={getNameValue}
                    onChange={getSearchValues}
                    name="userName"
                  />
                </div>
              </div>
              <div className="col-md-3">
                {/* tags */}
                <div className="pt-2">
                  <input
                    className={`formFieldRecipe  bgInput `}
                    type="search"
                    placeholder="Search by E-mail"
                    onChange={getSearchValues}
                    name="email"
                  />
                </div>
              </div>
              <div className="col-md-3">
                {/* roles */}
                <div className="pt-2">
                  <select
                    onChange={getSearchValues}
                    name="groupId"
                    className={`formFieldRecipe`}
                  >
                    <option value="">Searsh by Role</option>
                    <option value="2">User</option>
                    <option value="1">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* categories list body */}
          <div className={`categoriesBody mt-4 `}>
            <ul className="responsive-table-recipes">
              <li className="table-header  ">
                <div className="col col-1 ">#</div>
                <div role="button" className="col col-2">
                  User Name
                </div>
                <div className="col col-3">Image</div>
                <div className="col col-4">Phone Number</div>
                <div className="col col-5">E-mail</div>
                <div className="col col-6">Country</div>
                <div className="col col-7">Role</div>
                <div className="col col-8">Actions</div>
              </li>
            </ul>

            {isLoading ? (
              <div className="container text-center mt-5 pt-5">{loading()}</div>
            ) : (
              <ul className="responsive-table-recipes">
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <li key={index} className="table-row  ">
                      <div className="col col-1 " data-label="#">
                        {index + 1}
                      </div>
                      <div className="col col-2 " data-label="User Name:">
                        {user.userName}
                      </div>
                      <div className="col col-3 " data-label="Image :">
                        {user.imagePath ? (
                          <img
                            className="recipe-img "
                            src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
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
                      <div className="col col-4 " data-label="Phone Number :">
                        {user.phoneNumber}
                      </div>
                      <div className="col col-5 " data-label="E-mail :">
                        {user.email}
                      </div>
                      <div className="col col-6 " data-label="Country :">
                        {user.country}
                      </div>
                      <div className="col col-7 " data-label="Role :">
                        {user.group.name}
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
                              role="button"
                              onClick={() => handleShowShowItem(user)}
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
                              onClick={() =>
                                handleShowDelete(user.id, user.userName)
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

              <div className="addCatModalBody ">
                <DeleteData deleteItem={nameUser} />
              </div>

              <div className="addCatModalFooter"></div>
            </Modal.Body>
            <ModalFooter className="py-3">
              <button
                onClick={onDeleteSubmit}
                className={`btn py-1 px-3 fs-6  fw-medium  btn btn-outline-danger `}
              >
                Delete this {nameUser}
              </button>
            </ModalFooter>
          </Modal>
          {/* modal handle show item  */}
          <Modal className="" show={showShowItem} onHide={handleCloseShowItem}>
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
              <div className="addCatModalBody pt-3">
                {userShow.imagePath ? (
                  <img
                    className="w-100  mb-3"
                    src={`https://upskilling-egypt.com:3006/${userShow.imagePath}`}
                    alt=""
                  />
                ) : (
                  <img
                    className="recipe-img-not"
                    src={imgs.recipeImgNot}
                    alt=""
                  />
                )}
                <h4>
                  <i className="fa-solid fa-user"></i> : {userShow.userName}
                </h4>
                <h5>
                  <i className="fa-solid fa-id-card"></i> : {userShow.id}
                </h5>
                <h5>
                  <i className="fa-solid fa-at"></i> : {userShow.email}
                </h5>
                <h5>
                  <i className="fa-solid fa-mobile-screen-button"></i> :{" "}
                  {userShow.phoneNumber}
                </h5>
                <h5>
                  <i className="fa-solid fa-earth-africa"></i> :{" "}
                  {userShow.country}
                </h5>
                <h5>
                  <i className="fa-solid fa-user-shield"></i> :{" "}
                  {userShow.group?.name}
                </h5>
                <h5>
                  <i className="fa-solid fa-calendar-days"></i> :{" "}
                  {moment(userShow.creationDate).format("LLLL")}
                </h5>
                <h5>
                  <i className="fa-solid fa-file-pen"></i> :{" "}
                  {moment(userShow.modificationDate).fromNow()}
                </h5>
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
