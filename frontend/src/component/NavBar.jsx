import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <Link to="#" className="text-black hover:text-green-600">
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
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 md:space-y-0 mt-4 md:mt-0">
            <li>
              <Link to="/OurMenu" className="text-black hover:text-green-600">
                Our Menu
              </Link>
            </li>
            <li>
              <Link to="#" className="text-black hover:text-green-600">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-black hover:text-green-600"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/SignUpPage" 
            className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
          <Link 
            to="/LoginPage" 
            className="text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
