import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-gray-100 ">
      <div className="flex items-center justify-between relative px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        {/* logo section  */}
        <Link to="/" className="">
          <span className="ml-2 text-2xl font-bold tracking-wide txt-color">
            Job-Hunter
          </span>
        </Link>
        {/* nav section  */}
        <ul className="items-center hidden space-x-8 lg:flex font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="statistic"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Statistic
            </NavLink>
          </li>
          <li>
            <NavLink
              to="appliedjobs"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Applied Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="blog"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              Blog
            </NavLink>
          </li>
        </ul>
        {/* button section  */}
        <Link to="/statistic" className="hidden lg:flex">
          <button className="btn">Start Applying</button>
        </Link>
        {/* mobile navbar section  */}
        <div className="lg:hidden">
          {/* dropdown open button  */}
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars className="w-5 text-gray-600" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-10">
              <div className="p-5 bg-red-50 border rounded shadow-sm">
                {/* logo & button section  */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link to="/" className="inline-flex items-center">
                      <span className="ml-2 text-xl font-bold tracking-wide txt-color">
                        Job-Hunter
                      </span>
                    </Link>
                  </div>
                  {/* dropdown menu close button  */}
                  <div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaWindowClose className="w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* mobile nav items section  */}
                <nav className="ml-2">
                  <ul className="space-y-4 font-medium">
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive ? "active" : "default"
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="statistic"
                        className={({ isActive }) =>
                          isActive ? "active" : "default"
                        }
                      >
                        Statistic
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="appliedjobs"
                        className={({ isActive }) =>
                          isActive ? "active" : "default"
                        }
                      >
                        Applied Jobs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="blog"
                        className={({ isActive }) =>
                          isActive ? "active" : "default"
                        }
                      >
                        Blog
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
