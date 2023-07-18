import { useState } from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="lg:flex">
      {/* desktop sidebar */}
      <div className="basis-[30%] bg-gray-100 hidden lg:block ">
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
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
        <h1 className="text-center font-semibold text-4xl my-12">
          Welcome To House Hunting!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
