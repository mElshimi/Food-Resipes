import React, { useContext } from "react";
import {
  RouterProvider,
  createHashRouter,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ForgetPass from "./modules/AuthenticationModule/components/ForgetPass/ForgetPass";
import Login from "./modules/AuthenticationModule/components/Login/Login";
import Register from "./modules/AuthenticationModule/components/Register/Register";
import ResetPass from "./modules/AuthenticationModule/components/ResetPass/ResetPass";
import VerifyAccount from "./modules/AuthenticationModule/components/VerifyAccount/VerifyAccount";
import CategoriesList from "./modules/CatesoriesModule/components/CategoriesList/CategoriesList";
import FaveList from "./modules/FaveModule/components/FaveList/FaveList";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import Profile from "./modules/ProfileModule/components/Profile/Profile";
import RecipeData from "./modules/RecipesModule/components/RecipeData/RecipeData";
import RecipeDetails from "./modules/RecipesModule/components/RecipeDetails/RecipeDetails";
import RecipesList from "./modules/RecipesModule/components/RecipesList/RecipesList";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import PrivateRoute from "./modules/SharedModule/components/PrivateRoute/PrivateRoute";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./modules/SharedModule/components/PublicRoute/PublicRoute";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import { AuthContext } from "./context/AuthContext";
// import { createBrowserRouter } from "react-router-dom/dist";

export default function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgetpass",
          element: <ForgetPass />,
        },
        {
          path: "verifyaccount",
          element: <VerifyAccount />,
        },
        {
          path: "resetpass",
          element: <ResetPass />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipeData",
          element: (
            <PrivateRoute>
              <RecipeData />
            </PrivateRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <PrivateRoute>
              <CategoriesList />
            </PrivateRoute>
          ),
        },
        {
          path: "users",
          element: (
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          ),
        },
        {
          path: "favs",
          element: (
            <PublicRoute>
              <FaveList />
            </PublicRoute>
          ),
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "recipeDetails",
          element: <RecipeDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        closeOnClick
        position="top-center"
        pauseOnHover
        autoClose={1500}
      />
      <RouterProvider router={routes} />
    </>
  );
}
