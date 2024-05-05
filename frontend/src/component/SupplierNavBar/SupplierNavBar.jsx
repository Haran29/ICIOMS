import React, { useState } from "react";
import { Link } from "react-router-dom";

const SupplierNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-lg mb-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
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
              <Link
                to="/list-suplier"
                className="text-black hover:text-green-600"
              >
                Supplier
              </Link>
            </li>
            <li>
              <Link
                to="/place-order"
                className="text-black hover:text-green-600"
              >
                Place Order
              </Link>
            </li>
            <li>
              <Link
                to="/order-history"
                className="text-black hover:text-green-600 "
              >
                Order History
              </Link>
            </li>
            <li>
              <Link
                to="/ongoing-order"
                className="text-black hover:text-green-600 "
              >
                Ongoing Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SupplierNavBar;
