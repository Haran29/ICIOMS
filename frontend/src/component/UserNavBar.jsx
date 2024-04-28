import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; 

const UserNavBar = () => {
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
              <Link
                to="/OrderOnlinePage"
                className="text-black hover:text-green-600"
              >
                OrderOnline
              </Link>
            </li>
            <li>
              <Link to="#" className="text-black hover:text-green-600">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/OurMenu" className="text-black hover:text-green-600">
                OurMenu
              </Link>
            </li>
            <li>
              <Link to="#" className="text-black hover:text-green-600">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link to="#" className="text-black hover:text-green-600">
                AboutUs
              </Link>
            </li>
            <li>
              <Link to="#" className="text-black hover:text-green-600">
                ContactUs
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 ml-auto relative">
          <Link to="/CartPages" className="text-black hover:text-green-600" style={{ marginRight: "10px" }}>
            <FaShoppingCart /> {/* Cart icon */}
          </Link>
          <div className="relative">
            <FaUser className="text-black hover:text-green-600 cursor-pointer" onClick={toggleDropdown} /> {/* Profile icon */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="list-reset">
                  <li>
                    <Link to="/OrderHistory" className="block px-4 py-2 text-black hover:bg-gray-200">
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link to="/PaymentList" className="block px-4 py-2 text-black hover:bg-gray-200">
                     Payment History
                    </Link>
                  </li>
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

export default UserNavBar;
