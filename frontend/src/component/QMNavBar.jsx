import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const QMNavBar = () => {
  const Navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => {
        Navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const toggleMenu = () => {
    // Define toggleMenu function
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 mr-40">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <Link to="/" className="text-black hover:text-green-600">
              Vino IceCream
            </Link>
          </span>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="block text-black hover:text-green-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 md:space-y-0 mt-4 md:mt-0">
            <li>
              <Link to="/qm-home" className="text-black hover:text-green-600">
                Quality Management
              </Link>
            </li>
            <li>
              <Link to="/Menu" className="text-black hover:text-green-600">
                Our Menu
              </Link>
            </li>
            <li>
              <Link to="/AboutUS" className="text-black hover:text-green-600 ">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/AboutUS" className="text-black hover:text-green-600 ">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 ml-auto relative">
          <div className="relative">
            <FaUser
              className="text-black hover:text-green-600 cursor-pointer"
              onClick={toggleDropdown}
            />
            {/* Profile icon */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="list-reset">
                  <li>
                    <Link
                      to="/ManageProfile"
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                    >
                      Manage Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default QMNavBar;
