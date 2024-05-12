import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "ldrs/grid";
import "ldrs/trio";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [loginData, setLoginData] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [allRecipes, setAllRecipes] = useState(null);
  const [allUsersSystem, setAllUsersSystem] = useState(null);
  const [allUsersAdmin, setAllUsersAdmin] = useState(null);
  const [allFavs, setAllFavs] = useState(null);
  const baseUrl = `https://upskilling-egypt.com:3006/api/v1`;

  // const saveLoginData = () => {
  //   const encodedToken = localStorage.getItem("token");

  //   if (encodedToken) {
  //     const decodedToken = jwtDecode(encodedToken);
  //     setLoginData(decodedToken);
  //   }

  // };
  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        let decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };
  const [currUser, setCurrUser] = useState(null);
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Users/currentUser`, {
        headers: requestHeaders,
      });
      setCurrUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const btnloading = () => {
    return <l-trio size="30" speed="1.3" color="#fff"></l-trio>;
  };

  const loading = () => {
    return <l-grid size="100" speed="1.5" color="#51b879"></l-grid>;
  };
  // /////////////////////////////
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Category/?pageSize=1&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setAllCategories(response.data.totalNumberOfRecords);
    } catch (err) {
      console.log(err);
    }
  };
  // //////////////////////////////////////
  const getAllRecipes = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Recipe/?pageSize=1&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );

      setAllRecipes(response.data.totalNumberOfRecords);
    } catch (err) {
      console.log(err);
    }
  };
  // //////////////////////////////
  const getUsersSystem = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Users/?groups=2&pageSize=1&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );

      setAllUsersSystem(response.data.totalNumberOfRecords);
      // console.log(res);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getUsersAdmin = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Users/?groups=1&pageSize=1&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );

      setAllUsersAdmin(response.data.totalNumberOfRecords);

      // console.log(res);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // //////////////////////////////
  const getAllFavsRecipes = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe?pageSize=1000&pageNumber=1`,
        {
          headers: requestHeaders,
        }
      );
      setAlFavs(response.data.data);
      // console.log(response.data.totalNumberOfRecords);
      setAllFavs(response.data.totalNumberOfRecords);
      // console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
      getCurrentUser();
      getAllCategories();
      getAllRecipes();
      getUsersSystem();
      getUsersAdmin();
      getAllFavsRecipes();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        baseUrl,
        requestHeaders,
        loginData,
        saveLoginData,
        currUser,
        getCurrentUser,
        loading,
        btnloading,
        allCategories,
        allUsersSystem,
        allUsersAdmin,
        allRecipes,
        allFavs,
        getAllRecipes,
        getAllCategories,
        getUsersSystem,
        getAllFavsRecipes,
        getUsersAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}



