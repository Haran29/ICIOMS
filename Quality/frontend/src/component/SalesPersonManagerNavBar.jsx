import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; 

const SalesPersonManagerNavBar = () => {
  const Navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <span className="text-2xl font-semibold whitespace-nowrap">
          Vino IceCream
        </span>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-center">
          <ul className="font-medium flex space-x-8">
            <li>
              <Link to="/OrderConsole" className="text-black hover:text-green-600">
                OrderConsole
              </Link>
            </li>
            <li>
              <Link to="/GenerateReport" className="text-black hover:text-green-600">
              GenerateReport
              </Link>
            </li>
            <li>
              <Link to="/SalesStatisticsPage" className="text-black hover:text-green-600">
                SalesStatistics
              </Link>
            </li>
            <li>
              <Link to="/OrderHistoryPage" className="text-black hover:text-green-600">
                ManageOrders
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 ml-auto relative">
          <div className="relative">
            <FaUser className="text-black hover:text-green-600 cursor-pointer" onClick={toggleDropdown} /> {/* Profile icon */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="list-reset">
                  <li>
                    <Link to="/ManageProfile" className="block px-4 py-2 text-black hover:bg-gray-200">
                      Manage Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
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

export default SalesPersonManagerNavBar;
