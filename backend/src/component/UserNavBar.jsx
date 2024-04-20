import React from "react";
import { Link } from "react-router-dom";

const UserNavBar = () => {
  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Vino IceCream
          </span>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-center">
          <ul className="font-medium flex space-x-8">
            <li>
              <Link
                to="/OrderOnline"
                className="text-black hover:text-green-600 "
              >
                OrderOnline
              </Link>
            </li>
            <li>
              <Link to="/OurMenu" className="text-black hover:text-green-600">
                OurMenu
              </Link>
            </li>
            <li>
              <Link to="/AboutUs" className="text-black hover:text-green-600">
                AboutUs
              </Link>
            </li>
            <li>
              <Link
                to="/ContactUs"
                className="text-black hover:text-green-600 "
              >
                ContactUs
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/Logout" className="text-black hover:text-green-600">
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
