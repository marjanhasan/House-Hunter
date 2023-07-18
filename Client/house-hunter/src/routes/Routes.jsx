import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import Home from "../pages/home/Home";
import ErrorElement from "../components/errorElement/ErrorElement";

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
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
