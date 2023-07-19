import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import Home from "../pages/home/Home";
import ErrorElement from "../components/errorElement/ErrorElement";
import Register from "../pages/auth/Register/Register";
import Login from "../pages/auth/Login/Login";
import AddHouse from "../pages/shared/owner/AddHouse";
import MyHouse from "../pages/shared/owner/MyHouse";
import Booked from "../pages/shared/renter/Booked";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/addhouse",
        element: <AddHouse />,
      },
      {
        path: "/dashboard/myhouse",
        element: <MyHouse />,
      },
      {
        path: "/dashboard/booked",
        element: <Booked />,
      },
    ],
  },
]);
