import React, { useState } from "react";
import { Link } from "react-router-dom";
import YourImage from "../assets/person.png";

const QMNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
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
              <Link to="/our-menu" className="text-black hover:text-green-600">
                Our Menu
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="text-black hover:text-green-600 "
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-black hover:text-green-600 ">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <img
            src={YourImage}
            alt="placeholder Image"
            style={{ width: "35px", height: "35px" }}
          ></img>
        </div>
      </div>
    </nav>
  );
};

export default QMNavBar;
