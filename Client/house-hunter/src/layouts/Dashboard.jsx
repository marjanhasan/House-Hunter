import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaWindowClose, FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [isRenter, setIsRenter] = useState(false);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get("http://localhost:5000/profile", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => {
  //       console.log(err);
  //       navigate("/login");
  //     });
  // }, [navigate]);
  return (
    <div className="lg:flex">
      {/* desktop sidebar */}
      <div className="basis-[30%] bg-gray-100 hidden lg:block h-screen">
        <ul className="mx-10">
          {/* logo section  */}
          <Link to="/" className="">
            <span className="ml-2 mt-6 text-2xl font-bold tracking-wide txt-color">
              House-Hunter
            </span>
          </Link>
          <li className="ml-2 mt-10 border-b-2 pb-3">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              <span className="flex items-center gap-2 text-lg">
                <FaHome /> Home
              </span>
            </NavLink>
          </li>
          {isOwner && (
            <>
              <li className="ml-2 mt-10 border-b-2 pb-3">
                <NavLink
                  to="/dashboard/addhouse"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  <span className="flex items-center gap-2 text-lg">
                    <FaHome /> Add Your House
                  </span>
                </NavLink>
              </li>
              <li className="ml-2 mt-10 border-b-2 pb-3">
                <NavLink
                  to="/dashboard/myhouse"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  <span className="flex items-center gap-2 text-lg">
                    <FaHome /> My House
                  </span>
                </NavLink>
              </li>
            </>
          )}
          {isRenter && (
            <li className="ml-2 mt-10 border-b-2 pb-3">
              <NavLink
                to="/dashboard/booked"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                <span className="flex items-center gap-2 text-lg">
                  <FaHome /> Booked House
                </span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/* mobile dropdown */}
      <div className="lg:hidden block">
        <div className="ml-6">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsMenuOpen(true)}
            className="btn my-6"
          >
            <FaBars />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full z-10 bg-gray-300 space-x-10">
            <div className="ml-10 my-4">
              <button
                aria-label="Close Menu"
                title="Close Menu"
                onClick={() => setIsMenuOpen(false)}
                className="btn"
              >
                <FaWindowClose className="" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* home page content  */}
      <div className="basis-[70%] bg-gray-50">
        <h1 className="text-center font-semibold text-4xl my-4">
          Welcome To House Hunting!
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
