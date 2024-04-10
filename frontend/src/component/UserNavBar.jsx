import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; 

const UserNavBar = () => {
  const Navigate = useNavigate();
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
              <Link to="/AboutUs" className="text-black hover:text-green-600">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/OurMenu" className="text-black hover:text-green-600">
                OurMenu
              </Link>
            </li>
            <li>
              <Link to="/OrderConsole" className="text-black hover:text-green-600">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link to="/AboutUs" className="text-black hover:text-green-600">
                AboutUs
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="text-black hover:text-green-600">
                ContactUs
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 ml-auto">
        <Link to="/CartPage" className="text-black hover:text-green-600" style={{ marginRight: "10px" }}>
            <FaShoppingCart /> {/* Cart icon */}
          </Link>
          <Link to="/UserProfile" className="text-black hover:text-green-600">
            <FaUser onClick={handleLogout}/> {/* Profile icon */}
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
