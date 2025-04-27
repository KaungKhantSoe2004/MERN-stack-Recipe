import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ModalContext from "../context/modalCondition";
import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import axios from "axios";

const NavHeader = () => {
  const { toggleModal } = useContext(ModalContext);
  const navigate = useNavigate();

  // Replace this with your actual auth context/state
  const isAuthenticated = true; // Example - use your real auth state

  const handleAuthAction = async () => {
    try {
      if (isAuthenticated) {
        // Perform logout logic

        // navigate("/login"); // Redirect if needed
        const response = await axios.get("http://localhost:3000/user/logout", {
          withCredentials: true,
        });

        navigate("/login");
      } else {
        navigate("/login"); // Redirect to login page
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-between items-center navBar border-b border-gray-200 top-0 sticky bg-white/50 py-4 px-3 md:px-8 z-10">
      <div className="flex items-center w-1/5">
        <div>
          <h2 className="text-2xl text-black font-bold pl-0 md:pl-1 lg:pl-10">
            Recipe Book
          </h2>
        </div>
      </div>

      <div className="navTagContainer flex justify-around items-center w-3/5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center font-medium ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
            }`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center font-medium ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
            }`
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center font-medium ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
            }`
          }
        >
          CONTACT
        </NavLink>

        {/* Auth Button */}
        <button
          onClick={handleAuthAction}
          className="flex items-center space-x-2 font-medium text-gray-600 hover:text-blue-500 transition-colors"
        >
          {isAuthenticated ? (
            <>
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </>
          ) : (
            <>
              <FaSignInAlt className="w-4 h-4" />
              <span>Login</span>
            </>
          )}
        </button>

        {/* New Recipe Button */}
        <button
          onClick={toggleModal}
          className="group flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 active:bg-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>New Recipe</span>
        </button>
      </div>
    </div>
  );
};

export default NavHeader;
